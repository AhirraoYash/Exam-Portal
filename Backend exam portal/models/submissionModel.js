const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required']
  },
  selectedAnswer: {
    type: String,
    required: [true, 'Selected answer is required']
  }
});

const submissionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: [true, 'Exam ID is required']
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  answers: {
    type: [answerSchema],
    required: [true, 'Answers are required']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure one submission per student per exam
submissionSchema.index({ examId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema); 