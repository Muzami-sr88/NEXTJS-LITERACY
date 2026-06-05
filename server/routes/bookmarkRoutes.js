const express = require('express');
const router = express.Router();
const { toggleBookmark, getMyBookmarks } = require('../controllers/bookmarkController');
const { protect } = require('../middleware/protect');
const validate = require('../middleware/validate');
const { bookmarkToggleSchema } = require('../validations/commonSchemas');

router.post('/toggle', protect, validate(bookmarkToggleSchema), toggleBookmark);
router.get('/my-bookmarks', protect, getMyBookmarks);

module.exports = router;
