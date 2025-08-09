const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Teacher = require('../models/teacherModel');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const { fullName, email, password, prn, year } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if PRN already exists
    const prnExists = await User.findOne({ prn });
    if (prnExists) {
      return res.status(400).json({ message: 'PRN already exists' });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      prn,
      year
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        prn: user.prn,
        year: user.year,
        isApproved: user.isApproved,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login student
// @route   POST /api/auth/login
// @access  Public
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        prn: user.prn,
        year: user.year,
        isApproved: user.isApproved,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login teacher
// @route   POST /api/auth/teacher/login
// @access  Public
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for teacher email
    const teacher = await Teacher.findOne({ email });

    if (teacher && (await teacher.matchPassword(password))) {
      res.json({
        _id: teacher._id,
        fullName: teacher.fullName,
        email: teacher.email,
        token: generateToken(teacher._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  loginTeacher
}; 