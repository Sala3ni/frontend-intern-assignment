const Task = require('../models/Task');

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
const createTask = async (req, res) => {
  try {
    const { title, description, status = 'pending' } = req.body;
    const task = await Task.create(title, description, status, req.user.id);
    res.status(201).json({ success: true, message: 'Task created successfully', data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Private
 */
const getTasks = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const tasks = await Task.findAll(req.user.id, isAdmin);
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
const getTask = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const task = await Task.findById(req.params.id, req.user.id, isAdmin);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const isAdmin = req.user.role === 'admin';
    
    const task = await Task.update(req.params.id, title, description, status, req.user.id, isAdmin);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    }
    
    res.status(200).json({ success: true, message: 'Task updated successfully', data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const task = await Task.delete(req.params.id, req.user.id, isAdmin);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    }
    
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
