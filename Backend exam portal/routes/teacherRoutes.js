const express = require('express');
const router = express.Router();
const { protectTeacher } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getPendingStudents,
  getApprovedStudents,
  approveStudent,
  createExam,
  updateExam,
  deleteExam,
  getTeacherExams,
  getExamResults
} = require('../controllers/teacherController');

// Apply teacher authentication middleware to all routes
router.use(protectTeacher);

// Student Management Routes
// @route   GET /api/teacher/students/pending
// @desc    Get all pending students
// @access  Private (Teacher)
router.get('/students/pending', getPendingStudents);

// @route   GET /api/teacher/students/approved
// @desc    Get all approved students
// @access  Private (Teacher)
router.get('/students/approved', getApprovedStudents);

// @route   PUT /api/teacher/students/approve/:studentId
// @desc    Approve a student
// @access  Private (Teacher)
router.put('/students/approve/:studentId', approveStudent);

// Exam Management Routes
// @route   POST /api/teacher/exams/create
// @desc    Create a new exam
// @access  Private (Teacher)
router.post('/exams/create', upload.single('examFile'), createExam);

// @route   PUT /api/teacher/exams/update/:examId
// @desc    Update an exam
// @access  Private (Teacher)
router.put('/exams/update/:examId', updateExam);

// @route   DELETE /api/teacher/exams/delete/:examId
// @desc    Delete an exam
// @access  Private (Teacher)
router.delete('/exams/delete/:examId', deleteExam);

// Analytics & Viewing Routes
// @route   GET /api/teacher/exams
// @desc    Get all exams created by teacher
// @access  Private (Teacher)
router.get('/exams', getTeacherExams);

// @route   GET /api/teacher/exams/:examId/results
// @desc    Get results for a specific exam
// @access  Private (Teacher)
router.get('/exams/:examId/results', getExamResults);

module.exports = router; 