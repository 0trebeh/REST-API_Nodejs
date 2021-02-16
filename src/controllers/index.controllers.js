const pool = require('../database/dbconnection');

const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM users ORDER BY user_id ASC');
  res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
  res.json(response.rows);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const response = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [
    username, 
    email,
    password
  ]);
  res.json({
      message: 'User Added successfully',
      body: {
          user: {username, email, password}
      }
  })
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email, password } = req.body;

  const response = await pool.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4', [
      username,
      email,
      password,
      id
  ]);
  res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  await pool.query('DELETE FROM users where user_id = $1', [ id ]);
  res.json(`User ${id} deleted Successfully`);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};