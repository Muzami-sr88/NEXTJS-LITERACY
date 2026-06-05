const mongoose = require('mongoose');

const CriticalPerspectiveSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true },
  slug:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  author:   { type: String, default: 'Literary Palace', trim: true },
  tag:      { type: String, default: 'Critical Guide', trim: true },
  category: {
    type: String,
    enum: ['Criticism', 'Theories', 'Philosophies', 'All'],
    default: 'Criticism',
  },
  excerpt:  { type: String, trim: true, default: '' },
  content: {
    introduction: { body: [String] },
    overview:     { body: [String] },
    keyTheorists: [{ name: String, contribution: String }],
    examples:     [{ heading: String, body: String }],
  },
}, { timestamps: true });

CriticalPerspectiveSchema.index({ title: 'text', excerpt: 'text' });

CriticalPerspectiveSchema.index({ category: 1 });
CriticalPerspectiveSchema.index({ createdAt: -1 });

module.exports = mongoose.model('CriticalPerspective', CriticalPerspectiveSchema);
