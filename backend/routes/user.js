const express = require('express');
const multer = require('multer');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getUser);
router.get('/', userCtrl.getAllUsers);
router.put('/:id', multer, userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;