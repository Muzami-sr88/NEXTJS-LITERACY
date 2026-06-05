const express = require('express');
const router = express.Router();
const Literature = require('../models/Literature');
const LiteraryTerm = require('../models/LiteraryTerm');
const WorldLiterature = require('../models/WorldLiterature');
const CriticalPerspective = require('../models/CriticalPerspective');
const validate = require('../middleware/validate');
const { searchQuerySchema } = require('../validations/commonSchemas');
const asyncHandler = require('../utils/asyncHandler');

function searchFilter(text) {
  if (!text) return {};
  return {
    $or: [
      { title: new RegExp(text, 'i') },
      { author: new RegExp(text, 'i') },
      { excerpt: new RegExp(text, 'i') },
      { category: new RegExp(text, 'i') },
      { region: new RegExp(text, 'i') },
    ],
  };
}

router.get('/', validate(searchQuerySchema, 'query'), asyncHandler(async (req, res) => {
  const { q, limit = 6 } = req.query;
  const text = q.trim();
  if (!text) return res.json({ success: true, query: '', total: 0, data: [] });

  const lim = Math.min(Number(limit) || 6, 20);
  const filter = searchFilter(text);

  const [literature, terms, worldLit, critical] = await Promise.all([
    Literature.find(filter).select('title slug excerpt category').limit(lim).lean(),
    LiteraryTerm.find(filter).select('title slug excerpt category').limit(lim).lean(),
    WorldLiterature.find(filter).select('title slug excerpt region').limit(lim).lean(),
    CriticalPerspective.find(filter).select('title slug excerpt category').limit(lim).lean(),
  ]);

  const results = [
    ...literature.map((i) => ({ ...i, type: 'Literature', url: `/literature/${i.slug}` })),
    ...terms.map((i) => ({ ...i, type: 'Literary Term', url: `/literary-terms/${i.slug}` })),
    ...worldLit.map((i) => ({ ...i, type: 'World Literature', url: `/world-literature/${i.slug}` })),
    ...critical.map((i) => ({ ...i, type: 'Critical Perspective', url: `/critical-perspectives/${i.slug}` })),
  ];

  res.json({ success: true, query: text, total: results.length, data: results.slice(0, lim * 4) });
}));

module.exports = router;
