const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');
const postCtrl = require('../controllers/post');

router.post('/', auth, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getUserPosts);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likePost);
router.post("/:id/comments", auth, postCtrl.addComment);
module.exports = router;