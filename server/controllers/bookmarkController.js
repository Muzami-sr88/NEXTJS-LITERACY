const Bookmark = require('../models/Bookmark');
const asyncHandler = require('../utils/asyncHandler');

function getUserId(req) {
  return req.user?.id || req.user?._id || req.user?.userId;
}

exports.toggleBookmark = asyncHandler(async (req, res) => {
  const userId = getUserId(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated. Please login again.',
    });
  }

  const { articleId, articleType, title, slug, category } = req.body;

  const existing = await Bookmark.findOne({
    user: userId,
    articleId,
  }).lean();

  if (existing) {
    await Bookmark.deleteOne({ _id: existing._id });

    return res.json({
      success: true,
      bookmarked: false,
      message: 'Bookmark removed',
    });
  }

  const bookmark = await Bookmark.create({
    user: userId,
    articleId,
    articleType,
    title,
    slug,
    category,
  });

  return res.status(201).json({
    success: true,
    bookmarked: true,
    bookmark,
  });
});

exports.getMyBookmarks = asyncHandler(async (req, res) => {
  const userId = getUserId(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated. Please login again.',
    });
  }

  const bookmarks = await Bookmark.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

  return res.json({
    success: true,
    bookmarks,
  });
});