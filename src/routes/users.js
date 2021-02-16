const { Router } = require('express');
const router = Router();

const { 
    getUsers, 
    getUserById, 
    getLogin,
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/users.controllers');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users/login', getLogin);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;