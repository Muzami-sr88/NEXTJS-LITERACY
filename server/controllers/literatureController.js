const Literature = require('../models/Literature');
const asyncHandler = require('../utils/asyncHandler');
const slugifyText = require('../utils/slugifyText');

function arr(value) {
  return Array.isArray(value) ? value : [];
}
function cleanStrings(value) {
  return arr(value).map(x => String(x || '').trim()).filter(Boolean);
}
function normalizeLiteratureBody(body = {}) {
  const data = { ...body };
  if (!data.slug && data.title) data.slug = slugifyText(data.title);
  if (data.slug) data.slug = slugifyText(data.slug);

  if (typeof data.content === 'string') {
    const lines = cleanStrings(data.content.split(/\n+/));
    data.content = {
      introduction: { body: lines },
      plotSummary: { body: [] },
      summaryAnalysis: { chapters: [] },
      themes: [],
      quotes: [],
      characters: [],
      terms: [],
      symbols: [],
      themeWheel: { body: [], themes: [] },
    };
  }

  if (!data.content || typeof data.content !== 'object' || Array.isArray(data.content)) {
    data.content = {};
  }

  const c = data.content;
  data.content = {
    introduction: { body: cleanStrings(c.introduction?.body) },
    plotSummary: { body: cleanStrings(c.plotSummary?.body) },
    summaryAnalysis: {
      chapters: arr(c.summaryAnalysis?.chapters)
        .map(ch => ({
          title: String(ch?.title || '').trim(),
          summary: String(ch?.summary || '').trim(),
          analysis: String(ch?.analysis || '').trim(),
        }))
        .filter(ch => ch.title && ch.summary && ch.analysis),
    },
    themes: arr(c.themes)
      .map(x => ({
        title: String(x?.title || '').trim(),
        color: String(x?.color || '#07294e').trim(),
        desc: String(x?.desc || '').trim(),
      }))
      .filter(x => x.title && x.desc),
    quotes: arr(c.quotes)
      .map(x => ({
        quote: String(x?.quote || '').trim(),
        attribution: String(x?.attribution || '').trim(),
        tag: String(x?.tag || 'Theme').trim(),
        theme: String(x?.theme || '#07294e').trim(),
      }))
      .filter(x => x.quote && x.attribution),
    characters: arr(c.characters)
      .map(x => ({
        name: String(x?.name || '').trim(),
        role: String(x?.role || '').trim(),
        color: String(x?.color || '#07294e').trim(),
        desc: String(x?.desc || '').trim(),
      }))
      .filter(x => x.name && x.role && x.desc),
    terms: arr(c.terms)
      .map(x => ({
        term: String(x?.term || '').trim(),
        def: String(x?.def || '').trim(),
      }))
      .filter(x => x.term && x.def),
    symbols: arr(c.symbols)
      .map(x => ({
        symbol: String(x?.symbol || '').trim(),
        color: String(x?.color || '#07294e').trim(),
        desc: String(x?.desc || '').trim(),
      }))
      .filter(x => x.symbol && x.desc),
    themeWheel: {
      body: cleanStrings(c.themeWheel?.body),
      themes: arr(c.themeWheel?.themes)
        .map(x => ({
          label: String(x?.label || '').trim(),
          color: String(x?.color || '#07294e').trim(),
          pct: Math.max(0, Math.min(100, Number(x?.pct) || 0)),
        }))
        .filter(x => x.label),
    },
  };

  return data;
}

function makeFilter({ category, search, sort }) {
  const filter = {};
  if (category && category !== 'All') filter.category = category;

  if (search && search.trim()) {
    const text = search.trim();
    filter.$or = [
      { title: new RegExp(text, 'i') },
      { author: new RegExp(text, 'i') },
      { excerpt: new RegExp(text, 'i') },
      { category: new RegExp(text, 'i') },
    ];
  }

  if (sort && sort !== 'All' && sort !== '#') filter.title = new RegExp(`^${sort}`, 'i');
  if (sort === '#') filter.title = /^\d/;
  return filter;
}

exports.getAllLiterature = asyncHandler(async (req, res) => {
  const { category, search, sort, limit } = req.query;
  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 500);
  const filter = makeFilter({ category, search, sort });
  const sortOpt = sort && sort !== 'All' ? { title: 1 } : { createdAt: -1 };

  const [items, total] = await Promise.all([
    Literature.find(filter)
      .select('title slug author tag category excerpt createdAt')
      .sort(sortOpt)
      .limit(safeLimit)
      .lean(),
    Literature.countDocuments(filter),
  ]);

  res.json({
    success: true,
    total,
    data: items,
  });
});

exports.getRecentLiterature = asyncHandler(async (req, res) => {
  const safeLimit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 24);

  const [items, total] = await Promise.all([
    Literature.find()
      .select('title slug author tag category excerpt createdAt')
      .sort({ createdAt: -1 })
      .limit(safeLimit)
      .lean(),
    Literature.countDocuments(),
  ]);

  res.json({
    success: true,
    total,
    data: items,
  });
});

exports.getLiteratureBySlug = asyncHandler(async (req, res) => {
  const item = await Literature.findOne({ slug: req.params.slug }).lean();
  if (!item) return res.status(404).json({ success: false, message: 'Literature not found' });
  res.json({ success: true, data: item });
});

exports.createLiterature = asyncHandler(async (req, res) => {
  const item = await Literature.create(normalizeLiteratureBody(req.body));
  res.status(201).json({ success: true, data: item });
});

exports.updateLiterature = asyncHandler(async (req, res) => {
  const item = await Literature.findOneAndUpdate(
    { slug: req.params.slug },
    normalizeLiteratureBody(req.body),
    { new: true, runValidators: true }
  ).lean();
  if (!item) return res.status(404).json({ success: false, message: 'Literature not found' });
  res.json({ success: true, data: item });
});

exports.deleteLiterature = asyncHandler(async (req, res) => {
  const item = await Literature.findOneAndDelete({ slug: req.params.slug }).lean();
  if (!item) return res.status(404).json({ success: false, message: 'Literature not found' });
  res.json({ success: true, message: 'Deleted successfully' });
});
