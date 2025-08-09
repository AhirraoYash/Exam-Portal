const Exam = require('../models/examModel');
const Submission = require('../models/submissionModel');

// @desc    Get all exams for student
// @route   GET /api/student/exams
// @access  Private (Student)
const getStudentExams = async (req, res) => {
  try {
    const studentId = req.user._id;

    // Get all exams
    const exams = await Exam.find().populate('teacherId', 'fullName');

    // Get all submissions by this student
    const submissions = await Submission.find({ studentId });

    // Add submission status to each exam
    const examsWithStatus = exams.map(exam => {
      const submission = submissions.find(sub => sub.examId.toString() === exam._id.toString());
      const now = new Date();
      
      let status = 'Upcoming';
      if (exam.scheduledAt <= now) {
        status = submission ? 'Completed' : 'Active';
      }

      return {
        _id: exam._id,
        name: exam.name,
        teacherName: exam.teacherId.fullName,
        scheduledAt: exam.scheduledAt,
        questionCount: exam.questions.length,
        status,
        hasSubmitted: !!submission,
        score: submission ? submission.score : null
      };
    });

    res.json(examsWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student submissions
// @route   GET /api/student/submissions
// @access  Private (Student)
const getStudentSubmissions = async (req, res) => {
  try {
    const studentId = req.user._id;

    const submissions = await Submission.find({ studentId })
      .populate('examId', 'name scheduledAt')
      .sort({ submittedAt: -1 });

    const submissionsWithDetails = submissions.map(submission => ({
      _id: submission._id,
      examName: submission.examId.name,
      examDate: submission.examId.scheduledAt,
      score: submission.score,
      submittedAt: submission.submittedAt
    }));

    res.json(submissionsWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Submit exam answers
// @route   POST /api/student/exams/:examId/submit
// @access  Private (Student)
const submitExam = async (req, res) => {
  try {
    const examId = req.params.examId;
    const studentId = req.user._id;
    const { answers } = req.body;

    // Check if exam exists
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Check if exam is currently active
    const now = new Date();
    if (exam.scheduledAt > now) {
      return res.status(400).json({ message: 'Exam has not started yet' });
    }

    // Check if student has already submitted
    const existingSubmission = await Submission.findOne({ examId, studentId });
    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this exam' });
    }

    // Validate answers structure
    if (!Array.isArray(answers) || answers.length !== exam.questions.length) {
      return res.status(400).json({ message: 'Invalid answers format' });
    }

    // Calculate score
    let correctAnswers = 0;
    const processedAnswers = answers.map((answer, index) => {
      const question = exam.questions[index];
      const isCorrect = answer.selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
      }

      return {
        questionText: question.questionText,
        selectedAnswer: answer.selectedAnswer
      };
    });

    const score = Math.round((correctAnswers / exam.questions.length) * 100);

    // Create submission
    const submission = await Submission.create({
      examId,
      studentId,
      answers: processedAnswers,
      score
    });

    res.status(201).json({
      message: 'Exam submitted successfully',
      submission: {
        _id: submission._id,
        score: submission.score,
        submittedAt: submission.submittedAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get specific exam details for student
// @route   GET /api/student/exams/:examId
// @access  Private (Student)
const getExamDetails = async (req, res) => {
  try {
    const examId = req.params.examId;
    const studentId = req.user._id;

    // Get exam details
    const exam = await Exam.findById(examId).populate('teacherId', 'fullName');
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Check if student has already submitted
    const submission = await Submission.findOne({ examId, studentId });

    // Check if exam is currently active
    const now = new Date();
    let status = 'Upcoming';
    if (exam.scheduledAt <= now) {
      status = submission ? 'Completed' : 'Active';
    }

    // Prepare exam data (without correct answers for security)
    const examData = {
      _id: exam._id,
      name: exam.name,
      teacherName: exam.teacherId.fullName,
      scheduledAt: exam.scheduledAt,
      status,
      hasSubmitted: !!submission,
      questions: exam.questions.map(q => ({
        questionText: q.questionText,
        options: q.options
      }))
    };

    res.json(examData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudentExams,
  getStudentSubmissions,
  submitExam,
  getExamDetails
}; 