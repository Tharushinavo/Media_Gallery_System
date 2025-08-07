// Media routes (CRUD and search)
const express = require('express');
const router = express.Router();
const { uploadMedia, getMedia, getMediaById, updateMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, uploadMedia);
router.get('/', protect, getMedia);
router.get('/:id', protect, getMediaById);
router.put('/:id', protect, updateMedia);
router.delete('/:id', protect, deleteMedia);

module.exports = router;