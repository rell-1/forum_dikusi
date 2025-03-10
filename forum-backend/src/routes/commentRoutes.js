const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/comments', auth, commentController.createComment);
router.get('/comments/:threadId', commentController.getCommentsByThreadId);

module.exports = router;