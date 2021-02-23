const { Router } = require('express');
const router = Router();

const { 
    getMenus, 
    getSub,
    getQuestion,
    getAnswer,
    createMenu,
    createForm,
    createQuestion,
    updateMenu,
    updateForm,
    updateQuestion,
    createAnswer,
    deleteMenu,
    deleteForm,
    deleteQuestion,
    deleteAnswer,
} = require('../controllers/forms.controllers');

router.get('/menu', getMenus);
router.get('/submenu/:menu_id', getSub);
router.get('/question/:form_id', getQuestion);
router.get('/answer/:question_id', getAnswer);

router.post('/menu', createMenu);
router.post('/form', createForm);
router.post('/question', createQuestion);
router.post('/answer', createAnswer);

router.put('/menu/:menu_id', updateMenu);
router.put('/form/:form_id', updateForm);
router.put('/question/:question_id', updateQuestion);

router.delete('/menu/:menu_id', deleteMenu);
router.delete('/form/:form_id', deleteForm);
router.delete('/question/:question_id', deleteQuestion);
router.delete('/answer/:answer_id', deleteAnswer);

module.exports = router;