const User = require('../models/userModel');
const Exam = require('../models/examModel');
const Submission = require('../models/submissionModel');
const xlsx = require('xlsx');
const fs = require('fs');

// @desc    Get pending students
// @route   GET /api/teacher/students/pending
// @access  Private (Teacher)
const getPendingStudents = async (req, res) => {
  try {
    const students = await User.find({ isApproved: false })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get approved students
// @route   GET /api/teacher/students/approved
// @access  Private (Teacher)
const getApprovedStudents = async (req, res) => {
  try {
    const students = await User.find({ isApproved: true })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Approve a student
// @route   PUT /api/teacher/students/approve/:studentId
// @access  Private (Teacher)
const approveStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.isApproved = true;
    await student.save();

    res.json({ message: 'Student approved successfully', student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new exam
// @route   POST /api/teacher/exams/create
// @access  Private (Teacher)
const createExam = async (req, res) => {
  try {
    const { name, scheduledAt } = req.body;
    const teacherId = req.teacher._id;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an Excel file' });
    }

    // Read the Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Parse questions from Excel data
    const questions = data.map(row => {
      const options = [row.option1, row.option2, row.option3, row.option4].filter(option => option);
      
      if (options.length !== 4) {
        throw new Error('Each question must have exactly 4 options');
      }

      return {
        questionText: row.question,
        options: options,
        correctAnswer: row.correctAnswer
      };
    });

    if (questions.length === 0) {
      return res.status(400).json({ message: 'No valid questions found in the Excel file' });
    }

    // Create exam
    const exam = await Exam.create({
      name,
      teacherId,
      scheduledAt: new Date(scheduledAt),
      questions
    });

    // Delete uploaded file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: 'Exam created successfully',
      exam: {
        _id: exam._id,
        name: exam.name,
        scheduledAt: exam.scheduledAt,
        questionCount: exam.questions.length
      }
    });
  } catch (error) {
    console.error(error);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (error.message.includes('Each question must have exactly 4 options')) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an exam
// @route   PUT /api/teacher/exams/update/:examId
// @access  Private (Teacher)
const updateExam = async (req, res) => {
  try {
    const { name, scheduledAt } = req.body;
    const examId = req.params.examId;
    const teacherId = req.teacher._id;

    const exam = await Exam.findOne({ _id: examId, teacherId });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    exam.name = name || exam.name;
    exam.scheduledAt = scheduledAt ? new Date(scheduledAt) : exam.scheduledAt;

    await exam.save();

    res.json({
      message: 'Exam updated successfully',
      exam: {
        _id: exam._id,
        name: exam.name,
        scheduledAt: exam.scheduledAt,
        questionCount: exam.questions.length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an exam
// @route   DELETE /api/teacher/exams/delete/:examId
// @access  Private (Teacher)
const deleteExam = async (req, res) => {
  try {
    const examId = req.params.examId;
    const teacherId = req.teacher._id;

    const exam = await Exam.findOne({ _id: examId, teacherId });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Delete all submissions for this exam
    await Submission.deleteMany({ examId });

    // Delete the exam
    await Exam.findByIdAndDelete(examId);

    res.json({ message: 'Exam and all related submissions deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all exams created by teacher
// @route   GET /api/teacher/exams
// @access  Private (Teacher)
const getTeacherExams = async (req, res) => {
  try {
    const teacherId = req.teacher._id;

    const exams = await Exam.find({ teacherId })
      .sort({ scheduledAt: -1 });

    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get exam results
// @route   GET /api/teacher/exams/:examId/results
// @access  Private (Teacher)
const getExamResults = async (req, res) => {
  try {
    const examId = req.params.examId;
    const teacherId = req.teacher._id;

    // Verify exam belongs to teacher
    const exam = await Exam.findOne({ _id: examId, teacherId });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Get all approved students
    const students = await User.find({ isApproved: true }).select('fullName email prn year');

    // Get all submissions for this exam
    const submissions = await Submission.find({ examId }).populate('studentId', 'fullName email prn year');

    // Create results array
    const results = students.map(student => {
      const submission = submissions.find(sub => sub.studentId._id.toString() === student._id.toString());
      
      return {
        student: {
          _id: student._id,
          fullName: student.fullName,
          email: student.email,
          prn: student.prn,
          year: student.year
        },
        status: submission ? 'Attempted' : 'Not Attempted',
        score: submission ? submission.score : null,
        submittedAt: submission ? submission.submittedAt : null
      };
    });

    res.json({
      exam: {
        _id: exam._id,
        name: exam.name,
        scheduledAt: exam.scheduledAt,
        questionCount: exam.questions.length
      },
      results
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPendingStudents,
  getApprovedStudents,
  approveStudent,
  createExam,
  updateExam,
  deleteExam,
  getTeacherExams,
  getExamResults
}; 