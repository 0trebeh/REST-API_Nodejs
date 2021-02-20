const client = require('../utils/dbconnection'); 
const { main } = require('../utils/mailer');

const getMenus = async (req, res) => {
  const response = await client.query('SELECT menu_id, title FROM menu WHERE submenu is NULL');
  res.status(200).json(response.rows);
};
/*
const getSubmenus = async (req, res) => {
  const response = await client.query('');
  res.status(200).json(response.rows);
};

const getUsers = async (req, res) => {
  const response = await client.query('SELECT * FROM users ORDER BY user_id ASC');
  res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
  res.json(response.rows);
};

const getLogin = async (req, res) => {
  const { username, password } = req.body;
  const response = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [
    username, 
    password
  ]);
  res.json(response.rows);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const response = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [
    username, 
    email,
    password
  ]);

  //send email of welcome
  await main(username, email)
  .catch(console.error);

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

  const response = await client.query('select menu_id from menu where submenu is NULL', [
      username,
      email,
      password,
      id
  ]);
  res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  await client.query('DELETE FROM users where user_id = $1', [ id ]);
  res.json(`User ${id} deleted Successfully`);
};
*/
module.exports = {
  getMenus
};