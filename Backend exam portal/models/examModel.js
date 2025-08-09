const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: function(v) {
        return v.length === 4;
      },
      message: 'Each question must have exactly 4 options'
    }
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required']
  }
});

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exam name is required']
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher ID is required']
  },
  scheduledAt: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  questions: {
    type: [questionSchema],
    required: [true, 'Questions are required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Exam must have at least one question'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exam', examSchema); 