const mongoose = require('mongoose');

// ── Sub-schemas ─────────────────────────────────────────────

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  analysis: { type: String, required: true },
}, { _id: false });

const ThemeSchema = new mongoose.Schema({
  color: { type: String, default: '#07294e' },
  title: { type: String, required: true },
  desc: { type: String, required: true },
}, { _id: false });

const QuoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  attribution: { type: String, required: true },
  tag: { type: String, default: 'Theme' },
  theme: { type: String, default: '#07294e' },  // hex colour for the left border
}, { _id: false });

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  color: { type: String, default: '#07294e' },
  desc: { type: String, required: true },
}, { _id: false });

const TermSchema = new mongoose.Schema({
  term: { type: String, required: true },
  def: { type: String, required: true },
}, { _id: false });

const SymbolSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  color: { type: String, default: '#07294e' },
  desc: { type: String, required: true },
}, { _id: false });

const ThemeWheelItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  color: { type: String, default: '#07294e' },
  pct: { type: Number, min: 0, max: 100, required: true },
}, { _id: false });

// ── Main content schema ──────────────────────────────────────

const ContentSchema = new mongoose.Schema({
  introduction: {
    body: [String],
  },
  plotSummary: {
    body: [String],
  },
  summaryAnalysis: {
    chapters: [ChapterSchema],
  },
  themes: [ThemeSchema],
  quotes: [QuoteSchema],
  characters: [CharacterSchema],
  terms: [TermSchema],
  symbols: [SymbolSchema],
  themeWheel: {
    body: [String],
    themes: [ThemeWheelItemSchema],
  },
}, { _id: false });

// ── Root schema ─────────────────────────────────────────────

const LiteratureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  author: {
    type: String,
    default: 'Literary Palace',
    trim: true,
  },
  // Badge shown on the card e.g. "Lit Guide"
  tag: {
    type: String,
    default: 'Lit Guide',
    trim: true,
  },
  // Main filter category used in LiteratureInsights filter bar
  category: {
    type: String,
    enum: ['All', 'History', 'Poetry', 'Authors', 'Novels', 'Dramas/Plays', 'Short Stories', 'Prose/Essays'],
    default: 'All',
  },
  excerpt: {
    type: String,
    trim: true,
    default: '',
  },
  content: ContentSchema,
}, {
  timestamps: true,   // adds createdAt + updatedAt automatically
});

// ── Text index for search ───────────────────────────────────
LiteratureSchema.index({ title: 'text', author: 'text', excerpt: 'text' });

//LiteratureSchema.index({ slug: 1 });
LiteratureSchema.index({ category: 1 });
LiteratureSchema.index({ createdAt: -1 });



module.exports = mongoose.model("Literature", LiteratureSchema);
