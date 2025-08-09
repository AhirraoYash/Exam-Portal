# College Exam Portal Backend

A complete backend application for a college exam portal using the MERN stack (Node.js, Express.js, MongoDB with Mongoose).

## Features

- **Student Management**: Registration, approval system, and exam access
- **Teacher Dashboard**: Student approval, exam creation, and result analytics
- **Exam System**: Excel-based exam creation, scheduled exams, and automatic scoring
- **Security**: JWT authentication, password hashing, and route protection
- **File Upload**: Excel file parsing for exam creation

## Technology Stack

- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **File Processing**: Multer for uploads, xlsx for Excel parsing
- **Password Hashing**: bcryptjs

## Project Structure

```
backend/
│
├── config/
│   └── db.js                 # Database connection
├── middleware/
│   ├── authMiddleware.js      # JWT authentication
│   └── uploadMiddleware.js    # File upload configuration
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── teacherController.js   # Teacher operations
│   └── studentController.js   # Student operations
├── models/
│   ├── userModel.js          # Student model
│   ├── teacherModel.js       # Teacher model
│   ├── examModel.js          # Exam model
│   └── submissionModel.js    # Submission model
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── teacherRoutes.js      # Teacher routes
│   └── studentRoutes.js      # Student routes
├── uploads/                  # File upload directory
├── .env                      # Environment variables
├── index.js                  # Main server file
├── package.json              # Dependencies
└── README.md                 # Documentation
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=mongodb://localhost:27017/exam-portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

### 3. Database Setup

Make sure MongoDB is running on your system. The application will automatically create the database and collections.

### 4. Run the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Documentation

### Authentication Routes

#### Register Student
```
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "prn": "2021001",
  "year": "2021"
}
```

#### Login Student
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login Teacher
```
POST /api/auth/teacher/login
Content-Type: application/json

{
  "email": "teacher@example.com",
  "password": "password123"
}
```

### Teacher Routes (Protected)

#### Get Pending Students
```
GET /api/teacher/students/pending
Authorization: Bearer <token>
```

#### Get Approved Students
```
GET /api/teacher/students/approved
Authorization: Bearer <token>
```

#### Approve Student
```
PUT /api/teacher/students/approve/:studentId
Authorization: Bearer <token>
```

#### Create Exam
```
POST /api/teacher/exams/create
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Mathematics Final",
  "scheduledAt": "2024-01-15T10:00:00.000Z",
  "examFile": <Excel file>
}
```

**Excel File Format:**
The Excel file should have columns: `question`, `option1`, `option2`, `option3`, `option4`, `correctAnswer`

#### Update Exam
```
PUT /api/teacher/exams/update/:examId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Exam Name",
  "scheduledAt": "2024-01-20T10:00:00.000Z"
}
```

#### Delete Exam
```
DELETE /api/teacher/exams/delete/:examId
Authorization: Bearer <token>
```

#### Get Teacher's Exams
```
GET /api/teacher/exams
Authorization: Bearer <token>
```

#### Get Exam Results
```
GET /api/teacher/exams/:examId/results
Authorization: Bearer <token>
```

### Student Routes (Protected)

#### Get All Exams
```
GET /api/student/exams
Authorization: Bearer <token>
```

#### Get Exam Details
```
GET /api/student/exams/:examId
Authorization: Bearer <token>
```

#### Get Student Submissions
```
GET /api/student/submissions
Authorization: Bearer <token>
```

#### Submit Exam
```
POST /api/student/exams/:examId/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [
    {
      "questionText": "What is 2+2?",
      "selectedAnswer": "4"
    }
  ]
}
```

## Database Models

### User (Student)
- `fullName`: String (required)
- `email`: String (required, unique, lowercase)
- `password`: String (required, hashed)
- `prn`: String (required, unique)
- `year`: String (required)
- `isApproved`: Boolean (default: false)
- `timestamps`: true

### Teacher
- `fullName`: String (required)
- `email`: String (required, unique, lowercase)
- `password`: String (required, hashed)
- `timestamps`: true

### Exam
- `name`: String (required)
- `teacherId`: ObjectId (ref: Teacher, required)
- `scheduledAt`: Date (required)
- `questions`: Array of objects with:
  - `questionText`: String
  - `options`: Array of 4 Strings
  - `correctAnswer`: String

### Submission
- `examId`: ObjectId (ref: Exam, required)
- `studentId`: ObjectId (ref: User, required)
- `answers`: Array of objects with:
  - `questionText`: String
  - `selectedAnswer`: String
- `score`: Number (required)
- `submittedAt`: Date (default: Date.now)

## Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Route Protection**: Middleware protects sensitive routes
- **Input Validation**: Comprehensive validation for all inputs
- **File Upload Security**: Restricted to Excel files only

## Error Handling

The application includes comprehensive error handling for:
- Database connection issues
- Authentication failures
- File upload errors
- Validation errors
- General server errors

## Development

### Running in Development Mode
```bash
npm run dev
```

### Testing the API
You can test the API using tools like Postman or curl. Make sure to:
1. Register a student first
2. Create a teacher account in the database
3. Login to get JWT tokens
4. Use the token in the Authorization header for protected routes

## Production Deployment

1. Set proper environment variables
2. Use a production MongoDB instance
3. Set up proper CORS configuration
4. Use HTTPS in production
5. Implement rate limiting
6. Set up proper logging

## License

This project is licensed under the ISC License. 