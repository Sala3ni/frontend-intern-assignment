# Task Management System - Full Stack Application

A complete full-stack application with secure REST API backend and React frontend, featuring JWT authentication, role-based access control, and comprehensive CRUD operations.

## 🎯 Project Overview

This project demonstrates a production-ready, scalable backend system with:
- **Backend**: Node.js + Express + PostgreSQL (Neon Cloud)
- **Frontend**: React.js with Dark/Light theme
- **Authentication**: JWT-based with bcrypt password hashing
- **Authorization**: Role-based access (User vs Admin)
- **API Documentation**: Swagger/OpenAPI
- **Security**: Input validation, sanitization, SQL injection prevention

## ✨ Key Features

### Backend Features
- ✅ User registration & login with JWT authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Role-based access control (User vs Admin)
- ✅ CRUD operations for Tasks
- ✅ API versioning (v1)
- ✅ Input validation with detailed error messages
- ✅ Swagger API documentation
- ✅ Neon PostgreSQL cloud database
- ✅ RESTful design with proper status codes
- ✅ Health check endpoint

### Frontend Features
- ✅ Modern React with Hooks
- ✅ Dark/Light theme toggle
- ✅ User registration & login UI
- ✅ Protected dashboard with JWT
- ✅ Role-based UI:
  - **Admin**: Create, edit, delete tasks
  - **User**: View tasks & update status only
- ✅ Detailed error messages for validation
- ✅ Responsive design
- ✅ Real-time status updates

## 📁 Project Structure

```
backend/
├── backend-api/          # REST API Server
│   ├── src/
│   │   ├── config/       # Database & Swagger config
│   │   ├── controllers/  # Business logic
│   │   ├── middleware/   # Auth & validation
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Helper functions
│   │   └── server.js     # Entry point
│   ├── .env
│   └── package.json
│
└── frontend-ui/          # React Application
    ├── public/
    ├── src/
    │   ├── api.js        # API service
    │   ├── App.js        # Main component
    │   ├── App.css       # Styles with theme support
    │   └── index.js      # Entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn
- Neon Database account (free tier)

### 1. Clone Repository

```bash
git clone https://github.com/Sala3ni/frontend-intern-assignment.git
cd frontend-intern-assignment
```

### 2. Backend Setup

```bash
cd backend-api

# Install dependencies
npm install

# Configure .env file with Neon database credentials
# DB_HOST=your-neon-host.neon.tech
# DB_USER=your-username
# DB_PASSWORD=your-password
# DB_NAME=neondb
# DB_SSL=true

# Start server
npm run dev
```

Backend runs on: `http://localhost:5000`  
API Docs: `http://localhost:5000/api-docs`

### 3. Frontend Setup

```bash
cd frontend-ui

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on: `http://localhost:3000`

## 🗄️ Database Schema

### Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL (hashed) |
| role | VARCHAR(20) | DEFAULT 'user' |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Tasks Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | |
| status | VARCHAR(20) | DEFAULT 'pending' |
| user_id | INTEGER | FOREIGN KEY → users(id) |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

## 🔐 Role-Based Access Control

### Admin Role
- ✅ Create new tasks
- ✅ View all tasks
- ✅ Edit any task (title, description, status)
- ✅ Delete any task

### User Role
- ✅ View assigned tasks
- ✅ Update task status (Pending → In Progress → Completed)
- ❌ Cannot create tasks
- ❌ Cannot edit task details
- ❌ Cannot delete tasks

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // or "admin"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Endpoints

#### Create Task (Admin Only)
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "pending"
}
```

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete Task (Admin Only)
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

## 🔒 Security Features

1. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Never stored in plain text

2. **JWT Authentication**
   - Secure token generation
   - 7-day expiration
   - Bearer token in headers
   - Stored in localStorage

3. **Input Validation**
   - Express-validator middleware
   - Detailed error messages showing which field has error
   - Email format validation
   - Password length requirements (min 6 characters)
   - SQL injection prevention

4. **Role-Based Authorization**
   - Middleware checks user role
   - Frontend UI adapts based on role
   - Backend enforces permissions

## 🎨 Frontend Features

### Theme Support
- 🌙 Dark Mode
- ☀️ Light Mode
- Toggle button in top-right corner
- Theme preference saved in localStorage

### User Experience
- Detailed validation error messages
- Real-time status updates
- Responsive design
- Clean, modern UI
- Loading states
- Success/error notifications

## 🧪 Testing the Application

### Test Accounts

**Admin Account:**
```
Email: admin@test.com
Password: admin123
Role: admin
```

**User Account:**
```
Email: user@test.com
Password: user123
Role: user
```

### Testing Steps

1. Open `http://localhost:3000`
2. Register as Admin (select "admin" role)
3. Create some tasks
4. Logout
5. Register as User (select "user" role)
6. Try to create task (should not see form)
7. Update task status using dropdown
8. Test theme toggle

## 📈 Scalability Considerations

### Current Architecture
✅ Modular MVC structure  
✅ Cloud database (Neon PostgreSQL)  
✅ Stateless JWT authentication  
✅ RESTful API design  
✅ API versioning (v1)  
✅ Connection pooling  



## 📝 API Status Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon Cloud)
- bcryptjs
- jsonwebtoken
- express-validator
- swagger-ui-express
- pg (PostgreSQL client)

### Frontend
- React.js
- Axios
- CSS3 (with theme support)



## 👤 Author

**Saloni**


## 🚀 Live Demo

- GitHub Repository: https://github.com/Sala3ni/frontend-intern-assignment
- API Documentation: Available at `/api-docs` endpoint

---

