const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, loginTeacher } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new student
// @access  Public
router.post('/register', registerStudent);

// @route   POST /api/auth/login
// @desc    Login student
// @access  Public
router.post('/login', loginStudent);

// @route   POST /api/auth/teacher/login
// @desc    Login teacher
// @access  Public
router.post('/teacher/login', loginTeacher);

module.exports = router; 