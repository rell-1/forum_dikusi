const express = require('express');
const threadController = require('../controllers/threadController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/threads', auth, threadController.createThread);
router.get('/threads', threadController.getThreads);
router.get('/threads/:id', threadController.getThreadById);

module.exports = router;