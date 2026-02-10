const { pool } = require('../config/database');

class Task {
  static async create(title, description, status, userId) {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, status, userId]
    );
    return result.rows[0];
  }

  static async findAll(userId, isAdmin) {
    const query = isAdmin 
      ? 'SELECT t.*, u.name as user_name FROM tasks t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC'
      : 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC';
    const params = isAdmin ? [] : [userId];
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id, userId, isAdmin) {
    const query = isAdmin
      ? 'SELECT t.*, u.name as user_name FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.id = $1'
      : 'SELECT * FROM tasks WHERE id = $1 AND user_id = $2';
    const params = isAdmin ? [id] : [id, userId];
    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async update(id, title, description, status, userId, isAdmin) {
    const query = isAdmin
      ? 'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *'
      : 'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING *';
    const params = isAdmin ? [title, description, status, id] : [title, description, status, id, userId];
    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async delete(id, userId, isAdmin) {
    const query = isAdmin
      ? 'DELETE FROM tasks WHERE id = $1 RETURNING *'
      : 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *';
    const params = isAdmin ? [id] : [id, userId];
    const result = await pool.query(query, params);
    return result.rows[0];
  }
}

module.exports = Task;
