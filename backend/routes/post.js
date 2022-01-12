const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');
const userCtrl = require('../controllers/post');

router.post('/', auth, userCtrl.createPost);
router.get('/', auth, userCtrl.getAllPosts);
router.get('/:id', auth, userCtrl.getPost);
router.put('/:id', auth, multer, userCtrl.updatePost);
router.delete('/:id', auth, userCtrl.deletePost);

module.exports = router;