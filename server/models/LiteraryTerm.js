const mongoose = require('mongoose');

const LiteraryTermSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true },
  slug:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt:  { type: String, trim: true, default: '' },
  category: { type: String, default: 'General', trim: true },
  content: {
    definition:         { type: String, default: '' },
    simplifiedDef:      { type: String, default: '' },
    examples:           [{ heading: String, body: String }],
    relatedTerms:       [String],
  },
}, { timestamps: true });

LiteraryTermSchema.index({ title: 'text', excerpt: 'text' });

LiteraryTermSchema.index({ category: 1 });
LiteraryTermSchema.index({ createdAt: -1 });

module.exports = mongoose.model('LiteraryTerm', LiteraryTermSchema);
