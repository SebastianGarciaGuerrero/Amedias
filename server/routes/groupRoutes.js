const express = require('express');
const router = express.Router();
const { createGroup, joinGroup, getMyGroups } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createGroup);
router.post('/join', protect, joinGroup);
router.get('/', protect, getMyGroups);

module.exports = router;