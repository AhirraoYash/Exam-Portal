const express = require('express');
const router = express.Router();
const { protectStudent } = require('../middleware/authMiddleware');
const {
  getStudentExams,
  getStudentSubmissions,
  submitExam,
  getExamDetails
} = require('../controllers/studentController');

// Apply student authentication middleware to all routes
router.use(protectStudent);

// @route   GET /api/student/exams
// @desc    Get all exams for student
// @access  Private (Student)
router.get('/exams', getStudentExams);

// @route   GET /api/student/exams/:examId
// @desc    Get specific exam details for student
// @access  Private (Student)
router.get('/exams/:examId', getExamDetails);

// @route   GET /api/student/submissions
// @desc    Get student submissions
// @access  Private (Student)
router.get('/submissions', getStudentSubmissions);

// @route   POST /api/student/exams/:examId/submit
// @desc    Submit exam answers
// @access  Private (Student)
router.post('/exams/:examId/submit', submitExam);

module.exports = router; 