const pool = require('../utils/dbconnection'); 
const { main } = require('../utils/mailer');

const getMenus = async (req, res) => {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT menu_id, title_menu FROM menu WHERE submenu IS NULL');
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const getSub = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    const response = await client.query('WITH RECURSIVE ctemenu AS ( SELECT menu_id, title_menu, submenu FROM menu WHERE menu_id = $1 UNION ALL SELECT menu.menu_id, menu.title_menu, menu.submenu FROM menu JOIN ctemenu ON menu.submenu = ctemenu.menu_id) SELECT ctemenu.menu_id, ctemenu.title_menu, ctemenu.submenu, form.form_id, form.menu_id as form_menu, form.title_form, form.description_form, form.locked FROM ctemenu FULL OUTER JOIN form on ctemenu.menu_id = form.menu_id', [
      id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const getQuestion = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    const response = await client.query('SELECT * FROM question INNER JOIN type_question on question.form_id = $1 AND question.question_id = type_question.question_id', [
      id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const getAnswer = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    const response = await client.query('SELECT * FROM answer WHERE question_id = $1', [
      id
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
  const { menu_id, title_form, description_form, locked } = req.body;
  try {
    const response = await client.query('INSERT INTO form (menu_id, title_form, description_form, locked) VALUES ($1, $2, $3, %4) RETURNING *', [
      menu_id, 
      title_form, 
      description_form, 
      locked
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const createQuestion = async (req, res) => {
  const client = await pool.connect();
  const { form_id, title_q, description_q, value, response_size, required, selection, text, numeric, checklist, drop_down_list } = req.body;
  try {
    await client.query('BEGIN');
    const response = await client.query('INSERT INTO question (form_id, title_q, description_q, value, response_size, required) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
      form_id, 
      title_q, 
      description_q,
      value, 
      response_size, 
      required
    ]);
    const question_id = response.rows.question_id;
    await client.query('INSERT INTO type_question (question_id, selection, text, numeric, checklist, drop_down_list) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
      question_id, 
      selection, 
      text, 
      numeric, 
      checklist, 
      drop_down_list
    ]);
    await client.query('COMMIT')
    res.status(200).json(response.rows);
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release(true);
  }
};

const createAnswer = async (req, res) => {
  const client = await pool.connect();
  const { question_id, user_id, value } = req.body;
  try {
    const response = await client.query('INSERT INTO answer (question_id, user_id, value) VALUES ($1, $2, $3) RETURNING *', [
      question_id, 
      user_id, 
      value
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const updateMenu = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  const { title_menu } = req.body;
  try {
    const response = await client.query('UPDATE menu SET title_menu = $1 WHERE menu_id = $2 RETURNING *', [
      title_menu, 
      id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};


const updateForm = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  const { title_form, description_form, locked } = req.body;
  try {
    const response = await client.query('UPDATE form SET title_form = $1, description_form = $2, locked = $3 WHERE form_id = $4 RETURNING *', [
      title_form, 
      description_form,
      locked,
      id
    ]);
    res.status(200).json(response.rows);
  } finally {
    client.release(true);
  }
};

const updateQuestion = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  const { title_q, description_q, value, response_size, required, selection, text, numeric, checklist, drop_down_list } = req.body;
  try {
    await client.query('BEGIN');
    const response = await client.query('UPDATE question SET title_q = $1, description_q = $2, value = $3, response_size = $4, required = $5 WHERE question_id = $6 RETURNING *', [
      title_q, 
      description_q, 
      value,
      response_size, 
      required, 
      id 
    ]);
    await client.query('UPDATE type_question SET selection = $1, text = $2, numeric = $3, checklist = $4, drop_down_list = $5 WHERE question_id = $6 RETURNING *', [
      selection, 
      text, 
      numeric, 
      checklist, 
      drop_down_list,
      id 
    ]);
    await client.query('COMMIT')
    res.status(200).json(response.rows);
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release(true);
  }
};

const deleteMenu = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    await client.query('DELETE FROM menu WHERE menu_id = $1', [ id ]);
    res.status(200).json(`Menu deleted Successfully`);

  } finally {
    client.release(true);
  }
};

const deleteForm = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    await client.query('DELETE FROM form WHERE form_id = $1', [ id ]);
    res.status(200).json(`Form deleted Successfully`);

  } finally {
    client.release(true);
  }
};

const deleteQuestion = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    await client.query('DELETE FROM question WHERE question_id = $1', [ id ]);
    res.status(200).json(`Question deleted Successfully`);

  } finally {
    client.release(true);
  }
};

const deleteAnswer = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    await client.query('DELETE FROM answer WHERE answer_id = $1', [ id ]);
    res.status(200).json(`answer deleted Successfully`);

  } finally {
    client.release(true);
  }
};

module.exports = {
  getMenus,
  getSub,
  getQuestion,
  getAnswer,
  createMenu,
  createForm,
  createQuestion,
  createAnswer,
  updateMenu,
  updateForm,
  updateQuestion,
  deleteMenu,
  deleteForm,
  deleteQuestion,
  deleteAnswer
};