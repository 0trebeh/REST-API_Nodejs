const { Router } = require('express');
const router = Router();

const { 
    getMenus, 
    getSub,
    getQuestion,
    createMenu,
    createForm,
    createQuestion,
    updateMenu,
    updateForm,
    updateQuestion,
    deleteMenu,
    deleteForm,
    deleteQuestion,
} = require('../controllers/forms.controllers');

router.get('/menu', getMenus);
router.get('/submenu/:id', getSub);
router.get('/question/:id', getQuestion);

router.post('/menu', createMenu);
router.post('/form', createForm);
router.post('/question', createQuestion);

router.put('/menu/:id', updateMenu);
router.put('/form/:id', updateForm);
router.put('/question/:id', updateQuestion);

router.delete('/menu/:id', deleteMenu);
router.delete('/form/:id', deleteForm);
router.delete('/question/:id', deleteQuestion);

module.exports = router;