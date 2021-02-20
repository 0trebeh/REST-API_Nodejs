const client = require('../utils/dbconnection');
const { main } = require('../utils/mailer');

const getUsers = async (req, res) => {
  const response = await client.query('SELECT * FROM app_user ORDER BY user_id ASC');
  res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await client.query('SELECT * FROM app_user WHERE user_id = $1', [id]);
  res.status(200).json(response.rows);
};

const getLogin = async (req, res) => {
  const { username, password } = req.body;
  const response = await client.query('SELECT * FROM app_user WHERE username = $1 AND password = $2', [
    username, 
    password
  ]);
  res.status(200).json(response.rows);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const response = await client.query('INSERT INTO app_user (username, email, password) VALUES ($1, $2, $3)', [
    username, 
    email,
    password
  ]);

  //send email of welcome
  await main(username, email)
  .catch(console.error);

  res.status(200).json({
      message: 'User Added successfully',
      body: {
          user: {username, email, password}
      }
  })
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email, password } = req.body;

  const response = await client.query('UPDATE app_user SET username = $1, email = $2, password = $3 WHERE user_id = $4', [
      username,
      email,
      password,
      id
  ]);
  res.status(200).json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  await client.query('DELETE FROM app_user where user_id = $1', [ id ]);
  res.status(200).json(`User ${id} deleted Successfully`);
};

module.exports = {
  getUsers,
  getUserById,
  getLogin,
  createUser,
  updateUser,
  deleteUser
};