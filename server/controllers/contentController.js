const asyncHandler = require('../utils/asyncHandler');
const slugifyText = require('../utils/slugifyText');

function normalizeBody(Model, body = {}) {
  const data = { ...body };

  if (!data.slug && data.title) data.slug = slugifyText(data.title);
  if (data.slug) data.slug = slugifyText(data.slug);

  if (typeof data.content === 'string') {
    const lines = data.content.split(/\n+/).map((x) => x.trim()).filter(Boolean);
    if (Model.modelName === 'LiteraryTerm') {
      data.content = {
        definition: data.content,
        simplifiedDef: data.excerpt || '',
        examples: [],
        relatedTerms: [],
      };
    } else if (Model.modelName === 'CriticalPerspective') {
      data.content = {
        introduction: { body: lines.length ? lines : [data.content] },
        overview: { body: [] },
        keyTheorists: [],
        examples: [],
      };
    } else {
      data.content = {
        introduction: { body: lines.length ? lines : [data.content] },
        plotSummary: { body: [] },
        themes: [],
        quotes: [],
        characters: [],
        terms: [],
        symbols: [],
      };
    }
  }

  return data;
}

function makeSearchFilter({ search, category, region, sort }) {
  const filter = {};

  if (search && search.trim()) {
    const text = search.trim();
    filter.$or = [
      { title: new RegExp(text, 'i') },
      { author: new RegExp(text, 'i') },
      { excerpt: new RegExp(text, 'i') },
      { category: new RegExp(text, 'i') },
      { region: new RegExp(text, 'i') },
    ];
  }

  if (category && category !== 'All') filter.category = category;
  if (region && region !== 'All') filter.region = region;

  if (sort && sort !== 'All' && sort !== '#') {
    filter.title = new RegExp(`^${sort}`, 'i');
  } else if (sort === '#') {
    filter.title = /^\d/;
  }

  return filter;
}

function makeController(Model) {
  const getAll = asyncHandler(async (req, res) => {
    const { search, category, region, sort, limit } = req.query;
    const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 500);
    const filter = makeSearchFilter({ search, category, region, sort });
    const sortOpt = sort && sort !== 'All' ? { title: 1 } : { createdAt: -1 };

    const [items, total] = await Promise.all([
      Model.find(filter)
        .select('title slug author tag category excerpt region createdAt')
        .sort(sortOpt)
        .limit(safeLimit)
        .lean(),
      Model.countDocuments(filter),
    ]);

    res.json({ success: true, total, data: items });
  });

  const getRecent = asyncHandler(async (req, res) => {
    const safeLimit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 24);

    const [items, total] = await Promise.all([
      Model.find()
        .select('title slug author tag category excerpt region createdAt')
        .sort({ createdAt: -1 })
        .limit(safeLimit)
        .lean(),
      Model.countDocuments(),
    ]);

    res.json({ success: true, total, data: items });
  });

  const getBySlug = asyncHandler(async (req, res) => {
    const item = await Model.findOne({ slug: req.params.slug }).lean();
    if (!item) return res.status(404).json({ success: false, message: 'Content not found' });
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(normalizeBody(Model, req.body));
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findOneAndUpdate(
      { slug: req.params.slug },
      normalizeBody(Model, req.body),
      { new: true, runValidators: true }
    ).lean();
    if (!item) return res.status(404).json({ success: false, message: 'Content not found' });
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findOneAndDelete({ slug: req.params.slug }).lean();
    if (!item) return res.status(404).json({ success: false, message: 'Content not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  });

  return { getAll, getRecent, getBySlug, create, update, remove };
}

module.exports = makeController;
