const pool = require('../utils/dbconnection'); 
const { main } = require('../utils/mailer');

const getMenus = async (req, res) => {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT menu_id, title_menu FROM menu');
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const getSub = async (req, res) => {
  const client = await pool.connect();
  const menu_id = parseInt(req.params.id);
  try {
    const response = await client.query('WITH RECURSIVE ctemenu AS ( SELECT menu_id, title_menu, submenu FROM menu WHERE menu_id = $1 UNION ALL SELECT menu.menu_id, menu.title_menu, menu.submenu FROM menu JOIN ctemenu ON menu.submenu = ctemenu.menu_id) SELECT ctemenu.menu_id, ctemenu.title_menu, ctemenu.submenu, form.form_id, form.menu_id as form_menu, form.title_form, form.description_form, form.random_order, form.send_alert, form.locked FROM ctemenu FULL OUTER JOIN form on ctemenu.menu_id = form.menu_id', [
      menu_id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const getQuestion = async (req, res) => {
  const client = await pool.connect();
  const form_id = parseInt(req.params.id);
  try {
    const response = await client.query('SELECT * FROM question INNER JOIN type_question on question.form_id = $1 AND question.tq_id = type_question.tq_id', [
      form_id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const createMenu = async (req, res) => {
  const client = await pool.connect();
  const { title_menu, user_id, submenu } = req.body;
  try {
    const response = await client.query('INSERT INTO menu (title_menu, user_id, submenu) VALUES ($1, $2, $3) RETURNING *', [
      title_menu, 
      user_id, 
      submenu
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const createForm = async (req, res) => {
  const client = await pool.connect();
  const { menu_id, title_form, description_form, random_order, send_alert, locked } = req.body;
  try {
    const response = await client.query('INSERT INTO form (menu_id, title_form, description_form, random_order, send_alert, locked) VALUES ($1, $2, $3, %4, %5, %6) RETURNING *', [
      menu_id, 
      title_form, 
      description_form, 
      random_order, 
      send_alert, 
      locked
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const createQuestion = async (req, res) => {
  const client = await pool.connect();
  const { form_id, tq_id, title_q, description_q, response_size, required, selection, text, numeric, checklist, drop_down_list } = req.body;
  try {
    const respons = await client.query('INSERT INTO type_question (selection, text, numeric, checklist, drop_down_list) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      selection, 
      text, 
      numeric, 
      checklist, 
      drop_down_list
    ]);
    const response = await client.query('INSERT INTO question (form_id, tq_id, title_q, description_q, response_size, required) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
      form_id, 
      tq_id, 
      title_q, 
      description_q, 
      response_size, 
      required
    ]);
    res.status(200).json(response.rows);
    res.status(200).json(respons.rows);
  } finally {
    client.release(true);
  }
};

const updateMenu = async (req, res) => {
  const client = await pool.connect();
  const menu_id = parseInt(req.params.id);
  const { title_menu, user_id, submenu } = req.body;
  try {
    const response = await client.query('UPDATE menu SET title_menu = $1, user_id = $2, submenu = $3 WHERE menu_id = $4 RETURNING *', [
      title_menu, 
      user_id, 
      submenu,
      menu_id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};


const updateForm = async (req, res) => {
  const form_id = parseInt(req.params.id);
  const { title_form, description_form, random_order, send_alert, locked } = req.body;
  try {
    const response = await client.query('UPDATE form SET title_form = $1, description_form = $2, random_order = $3, send_alert = $4, locked = $5 WHERE form_id = $6 RETURNING *', [
      title_form, 
      description_form,
      random_order,
      send_alert, 
      locked,
      form_id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const updateQuestion = async (req, res) => {
  const id = parseInt(req.params.id);
  const {  } = req.body;
  try {
    const response = await client.query(' RETURNING *', [
      
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

/*
deleteMenu
deleteForm
deleteQuestion
*/

module.exports = {
  getMenus,
  getSub,
  getQuestion,
  createMenu,
  createForm,
  createQuestion,
  updateMenu,
  updateForm,
  updateQuestion,
  /*deleteMenu,
  deleteForm,
  deleteQuestion,*/
};