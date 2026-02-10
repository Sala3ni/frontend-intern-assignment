# Task Management - Frontend

Simple React UI for interacting with the Task Management API.

## 🚀 Features

- User registration and login
- JWT token management
- Protected dashboard
- CRUD operations for tasks
- Role-based UI (admin sees all tasks)
- Real-time error/success messages
- Responsive design

## 🛠️ Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm start
```

App will run on `http://localhost:3000`

## 📋 Prerequisites

- Node.js (v14+)
- Backend API running on `http://localhost:5000`

## 🎯 Usage

1. **Register**: Create a new account (choose user or admin role)
2. **Login**: Sign in with your credentials
3. **Dashboard**: View and manage tasks
4. **Create Task**: Add new tasks with title, description, and status
5. **Edit Task**: Update existing tasks
6. **Delete Task**: Remove tasks

## 🔒 Authentication

- JWT tokens stored in localStorage
- Automatic token injection in API requests
- Auto-logout on token expiration

## 📁 Project Structure

```
frontend-ui/
├── public/
│   └── index.html
├── src/
│   ├── api.js          # Axios API service
│   ├── App.js          # Main component
│   ├── App.css         # Styles
│   └── index.js        # Entry point
├── package.json
└── README.md
```

## 🎨 UI Components

- **Auth View**: Login/Register forms
- **Dashboard**: Task management interface
- **Task Form**: Create/Edit tasks
- **Task List**: Display all tasks with actions

## 🔗 API Integration

All API calls go through `src/api.js`:
- `authAPI.register()` - Register user
- `authAPI.login()` - Login user
- `authAPI.getMe()` - Get current user
- `taskAPI.create()` - Create task
- `taskAPI.getAll()` - Get all tasks
- `taskAPI.update()` - Update task
- `taskAPI.delete()` - Delete task
