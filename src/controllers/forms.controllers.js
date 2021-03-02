const pool = require('../utils/dbconnection'); 
const query = require('../utils/queries');


const getMenus = async (req, res) => {
  const client = await pool.connect();
  try {
    const response = await client.query(query.getMenus);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const getSub = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    const response = await client.query(query.getSub, [
      id
    ]);

    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const getQuestion = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    const response = await client.query(query.getQuestion, [
      id
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const getAnswer = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    const response = await client.query(query.getAnswer, [
      id
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const getAnswerUser = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    const response = await client.query(query.getAnswerUser, [
      id
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const createMenu = async (req, res) => {
  const client = await pool.connect();
  const { title_menu, user_id, submenu } = req.body;
  try {
    const response = await client.query(query.createMenu, [
      title_menu, 
      user_id, 
      submenu
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const createForm = async (req, res) => {
  const client = await pool.connect();
  const { menu_id, title_form, description_form, locked } = req.body;
  try {
    const response = await client.query(query.createForm, [
      menu_id, 
      title_form, 
      description_form, 
      locked
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const createQuestion = async (req, res) => {
  const client = await pool.connect();
  const { form_id, title_q, description_q, value, response_size, required, selection, text, numeric, checklist } = req.body;
  let question_id = 0;
  try {
    await client.query('BEGIN');
    const response = await client.query(query.createQuestion, [
      form_id, 
      title_q, 
      description_q,
      value, 
      response_size, 
      required
    ]);
    
    question_id = response.rows[0].question_id;
    res.status(200).json(response.rows);

    await client.query(query.createQuestion2, [
      question_id, 
      selection, 
      text, 
      numeric, 
      checklist
    ]);

    await client.query('COMMIT')

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


    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      
    }


    
    const response = await client.query(query.createAnswer, [
      question_id, 
      user_id, 
      value
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const updateMenu = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  const { title_menu } = req.body;
  try {
    const response = await client.query(query.updateMenu, [
      title_menu, 
      id
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};


const updateForm = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  const { title_form, description_form, locked } = req.body;
  try {
    const response = await client.query(query.updateForm, [
      title_form, 
      description_form,
      locked,
      id
    ]);
    res.status(200).json(response.rows);
  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const updateQuestion = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  const { title_q, description_q, value, response_size, required, selection, text, numeric, checklist } = req.body;
  try {
    await client.query('BEGIN');
    const response = await client.query(query.updateQuestion, [
      title_q, 
      description_q, 
      value,
      response_size, 
      required, 
      id 
    ]);
    await client.query(query.updateQuestion2, [
      selection, 
      text, 
      numeric, 
      checklist,
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
    await client.query(query.deleteMenu, [ id ]);
    res.status(200).json(`Menu deleted Successfully`);

  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const deleteForm = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    await client.query(query.deleteForm, [ id ]);
    res.status(200).json(`Form deleted Successfully`);

  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const deleteQuestion = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    await client.query(query.deleteQuestion, [ id ]);
    res.status(200).json(`Question deleted Successfully`);

  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

const deleteAnswer = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);
  try {
    await client.query(query.deleteAnswer, [ id ]);
    res.status(200).json(`answer deleted Successfully`);

  } catch{
    res.status(505);
  } finally {
    client.release(true);
  }
};

module.exports = {
  getMenus,
  getSub,
  getQuestion,
  getAnswer,
  getAnswerUser,
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