const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    articleType: {
      type: String,
      enum: [
        "literature",
        "literary-term",
        "world-literature",
        "critical-perspective",
      ],
      default: "literature",
    },
    title: String,
    slug: String,
    category: String,
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, articleId: 1 }, { unique: true });

bookmarkSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Bookmark", bookmarkSchema);