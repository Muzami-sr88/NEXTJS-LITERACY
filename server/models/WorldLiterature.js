const mongoose = require('mongoose');

const WorldLiteratureSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  author: { type: String, default: 'Literary Palace', trim: true },
  tag: { type: String, default: 'World Lit Guide', trim: true },
  region: { type: String, default: 'Global', trim: true },
  excerpt: { type: String, trim: true, default: '' },
  content: {
    introduction: { body: [String] },
    plotSummary: { body: [String] },
    themes: [{ color: String, title: String, desc: String }],
    quotes: [{ quote: String, attribution: String, tag: String, theme: String }],
    characters: [{ name: String, role: String, color: String, desc: String }],
    terms: [{ term: String, def: String }],
    symbols: [{ symbol: String, color: String, desc: String }],
  },
}, { timestamps: true });

WorldLiteratureSchema.index({ title: 'text', author: 'text', excerpt: 'text' });

WorldLiteratureSchema.index({ region: 1 });
WorldLiteratureSchema.index({ createdAt: -1 });

module.exports = mongoose.model('WorldLiterature', WorldLiteratureSchema);
