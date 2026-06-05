const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const { protect } = require('../middleware/protect');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads', 'images');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeBase = path
      .parse(file.originalname)
      .name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'image';
    cb(null, `${Date.now()}-${safeBase}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/image', protect, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const media = await Media.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      url: `/uploads/images/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    res.status(201).json({
      success: true,
      data: media,
      url: media.url,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/images', protect, async (_req, res, next) => {
  try {
    const items = await Media.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
