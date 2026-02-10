# Task Management System - Full Stack Application

A complete full-stack application with secure REST API backend and React frontend, featuring JWT authentication, role-based access control, and comprehensive CRUD operations.

## 🎯 Project Overview

This project demonstrates a production-ready, scalable backend system with:
- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: React.js with modern UI
- **Authentication**: JWT-based with bcrypt password hashing
- **Authorization**: Role-based access (User vs Admin)
- **API Documentation**: Swagger/OpenAPI
- **Security**: Input validation, sanitization, SQL injection prevention

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
│   ├── package.json
│   └── README.md
│
└── frontend-ui/          # React Application
    ├── public/
    ├── src/
    │   ├── api.js        # API service
    │   ├── App.js        # Main component
    │   ├── App.css       # Styles
    │   └── index.js      # Entry point
    ├── package.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ 
- PostgreSQL v12+
- npm or yarn

### 1. Database Setup

```bash
# Install PostgreSQL (if not installed)
# Windows: Download from https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
psql -U postgres
CREATE DATABASE taskdb;
\q
```

### 2. Backend Setup

```bash
cd backend-api

# Install dependencies
npm install

# Configure environment
# Edit .env file with your database credentials
# DB_USER=postgres
# DB_PASSWORD=your_password

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

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
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

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user" }
}
```

### Task Endpoints

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "pending"  // pending, in-progress, completed
}

Response: 201 Created
{
  "success": true,
  "message": "Task created successfully",
  "data": { "id": 1, "title": "Complete project", ... }
}
```

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "count": 5,
  "data": [ { "id": 1, "title": "Task 1", ... }, ... ]
}
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": { "id": 1, "title": "Task 1", ... }
}
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

Response: 200 OK
{
  "success": true,
  "message": "Task updated successfully",
  "data": { "id": 1, "title": "Updated title", ... }
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Task deleted successfully"
}
```

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

## 🔒 Security Features

1. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Never stored in plain text

2. **JWT Authentication**
   - Secure token generation
   - 7-day expiration
   - Bearer token in headers

3. **Input Validation**
   - Express-validator middleware
   - Email format validation
   - Password length requirements
   - SQL injection prevention

4. **Role-Based Access**
   - User: Can only access own tasks
   - Admin: Can access all tasks

5. **CORS Protection**
   - Configured for frontend origin

## 📈 Scalability Considerations

### Current Architecture
✅ Modular MVC structure  
✅ Database connection pooling  
✅ Stateless JWT authentication  
✅ RESTful API design  
✅ API versioning (v1)  

### Future Enhancements

#### 1. Caching Layer
```
Redis for:
- Session management
- Frequently accessed data
- Rate limiting
```

#### 2. Microservices Architecture
```
Split into services:
- Auth Service (User management)
- Task Service (CRUD operations)
- Notification Service (Email/Push)
```

#### 3. Load Balancing
```
Nginx reverse proxy:
- Distribute traffic across multiple instances
- SSL termination
- Static file serving
```

#### 4. Message Queue
```
RabbitMQ/Kafka for:
- Async task processing
- Event-driven architecture
- Decoupled services
```

#### 5. Containerization
```yaml
Docker + Kubernetes:
- Container orchestration
- Auto-scaling
- Zero-downtime deployments
```

#### 6. Database Optimization
```
- Indexing on frequently queried columns
- Read replicas for scaling reads
- Connection pooling optimization
- Query optimization
```

#### 7. Monitoring & Logging
```
- Prometheus for metrics
- Grafana for visualization
- ELK stack for log aggregation
- APM tools (New Relic, DataDog)
```

#### 8. API Gateway
```
Kong/AWS API Gateway:
- Centralized authentication
- Rate limiting
- Request/response transformation
- Analytics
```

#### 9. CDN Integration
```
CloudFront/Cloudflare:
- Static asset delivery
- Edge caching
- DDoS protection
```

#### 10. CI/CD Pipeline
```
GitHub Actions/Jenkins:
- Automated testing
- Continuous deployment
- Code quality checks
```

## 🧪 Testing the Application

### Using cURL

```bash
# Register a user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Create a task (replace <TOKEN> with actual token)
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title":"My Task","description":"Task description","status":"pending"}'

# Get all tasks
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer <TOKEN>"
```

### Using Frontend UI

1. Open `http://localhost:3000`
2. Register a new account
3. Login with credentials
4. Create, view, edit, and delete tasks
5. Test role-based access (create admin user)

## 📦 Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend-ui
vercel

# Update API_URL in src/api.js to your backend URL
```

## 🎓 Learning Outcomes

This project demonstrates:
- RESTful API design principles
- JWT authentication implementation
- Role-based authorization
- Database schema design
- Input validation and security
- Frontend-backend integration
- Error handling best practices
- API documentation
- Scalable architecture patterns

## 📝 API Status Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🤝 Contributing

This is an assignment project. For production use:
1. Add comprehensive unit tests
2. Implement rate limiting
3. Add request logging
4. Set up monitoring
5. Configure production database
6. Enable HTTPS
7. Add email verification
8. Implement password reset

## 📄 License

MIT

## 👤 Author

Backend Developer Intern Assignment for PrimeTrade

## 📧 Contact

For questions about this assignment, contact:
- joydip@primetrade.ai
- hello@primetrade.ai
- chetan@primetrade.ai
- sonika@primetrade.ai
