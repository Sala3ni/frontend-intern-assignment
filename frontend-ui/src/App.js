import React, { useState, useEffect } from 'react';
import { authAPI, taskAPI } from './api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login');
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (token) {
      authAPI.getMe()
        .then(res => setUser(res.data.data))
        .catch(() => logout());
    }
  }, [token]);

  useEffect(() => {
    if (user) loadTasks();
  }, [user]);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.register(formData);
      localStorage.setItem('token', res.data.data.token);
      setToken(res.data.data.token);
      setUser(res.data.data.user);
      showMessage('Registration successful!');
      setFormData({});
    } catch (err) {
      const errorMsg = err.response?.data?.errors 
        ? err.response.data.errors.map(e => `${e.path}: ${e.msg}`).join(', ')
        : err.response?.data?.message || 'Registration failed';
      showMessage(errorMsg, 'error');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.login(formData);
      localStorage.setItem('token', res.data.data.token);
      setToken(res.data.data.token);
      setUser(res.data.data.user);
      showMessage('Login successful!');
      setFormData({});
    } catch (err) {
      const errorMsg = err.response?.data?.errors 
        ? err.response.data.errors.map(e => `${e.path}: ${e.msg}`).join(', ')
        : err.response?.data?.message || 'Login failed';
      showMessage(errorMsg, 'error');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setTasks([]);
    setView('login');
  };

  const loadTasks = async () => {
    try {
      const res = await taskAPI.getAll();
      setTasks(res.data.data);
    } catch (err) {
      showMessage('Failed to load tasks', 'error');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.create(formData);
      showMessage('Task created!');
      setFormData({});
      loadTasks();
    } catch (err) {
      const errorMsg = err.response?.data?.errors 
        ? err.response.data.errors.map(e => `${e.path}: ${e.msg}`).join(', ')
        : err.response?.data?.message || 'Failed to create task';
      showMessage(errorMsg, 'error');
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.update(editingTask.id, formData);
      showMessage('Task updated!');
      setEditingTask(null);
      setFormData({});
      loadTasks();
    } catch (err) {
      const errorMsg = err.response?.data?.errors 
        ? err.response.data.errors.map(e => `${e.path}: ${e.msg}`).join(', ')
        : err.response?.data?.message || 'Failed to update task';
      showMessage(errorMsg, 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskAPI.delete(id);
      showMessage('Task deleted!');
      loadTasks();
    } catch (err) {
      showMessage('Failed to delete task', 'error');
    }
  };

  const handleUserStatusUpdate = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      await taskAPI.update(taskId, { 
        title: task.title, 
        description: task.description, 
        status: newStatus 
      });
      showMessage('Status updated!');
      loadTasks();
    } catch (err) {
      showMessage('Failed to update status', 'error');
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description, status: task.status });
  };

  if (!token) {
    return (
      <div className="container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="auth-box">
          <h1>Task Management</h1>
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
          
          <div className="tabs">
            <button className={view === 'login' ? 'active' : ''} onClick={() => setView('login')}>Login</button>
            <button className={view === 'register' ? 'active' : ''} onClick={() => setView('register')}>Register</button>
          </div>

          {view === 'login' ? (
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="password" placeholder="Password" required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <button type="submit">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Name" required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email" required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="password" placeholder="Password (min 6 chars)" required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <select onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit">Register</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <span>{user?.name} ({user?.role})</span>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

        {user?.role === 'admin' && (
          <div className="task-form">
            <h2>{editingTask ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask}>
              <input type="text" placeholder="Title" required value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <textarea placeholder="Description" value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <select value={formData.status || 'pending'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="form-actions">
                <button type="submit">{editingTask ? 'Update' : 'Create'}</button>
                {editingTask && (
                  <button type="button" onClick={() => { setEditingTask(null); setFormData({}); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="tasks">
          <h2>Tasks ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Create one above!</p>
          ) : (
            <div className="task-list">
              {tasks.map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`status ${task.status}`}>{task.status}</span>
                  </div>
                  <p>{task.description}</p>
                  {user?.role === 'admin' && task.user_name && (
                    <small>Created by: {task.user_name}</small>
                  )}
                  <div className="task-actions">
                    {user?.role === 'admin' ? (
                      <>
                        <button onClick={() => startEdit(task)}>Edit</button>
                        <button className="delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </>
                    ) : (
                      <select 
                        value={task.status} 
                        onChange={(e) => handleUserStatusUpdate(task.id, e.target.value)}
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'pointer' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
