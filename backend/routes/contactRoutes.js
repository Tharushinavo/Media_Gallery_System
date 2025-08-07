// Contact routes
const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, deleteMessage } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, submitMessage);
router.get('/', protect, adminOnly, getMessages);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;