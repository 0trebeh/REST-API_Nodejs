const { Router } = require('express');
const router = Router();

const { 
    getMenus, 
} = require('../controllers/forms.controllers');

router.get('/', getMenus);

module.exports = router;