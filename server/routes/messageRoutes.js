const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// OJO: Agregamos /:groupId al GET para saber qué chat leer
router.get('/:groupId', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;