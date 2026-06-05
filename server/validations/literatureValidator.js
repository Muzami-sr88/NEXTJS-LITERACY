const Joi = require('joi');

const paragraphArray = Joi.array().items(Joi.string().trim().allow('')).default([]);

const chapterSchema = Joi.object({
  title: Joi.string().trim().required(),
  summary: Joi.string().trim().required(),
  analysis: Joi.string().trim().required(),
});

const themeSchema = Joi.object({
  color: Joi.string().trim().default('#07294e'),
  title: Joi.string().trim().required(),
  desc: Joi.string().trim().required(),
});

const quoteSchema = Joi.object({
  quote: Joi.string().trim().required(),
  attribution: Joi.string().trim().required(),
  tag: Joi.string().valid('Theme', 'Character', 'Chapter').default('Theme'),
  theme: Joi.string().trim().default('#07294e'),
});

const characterSchema = Joi.object({
  name: Joi.string().trim().required(),
  role: Joi.string().trim().required(),
  color: Joi.string().trim().default('#07294e'),
  desc: Joi.string().trim().required(),
});

const termSchema = Joi.object({
  term: Joi.string().trim().required(),
  def: Joi.string().trim().required(),
});

const symbolSchema = Joi.object({
  symbol: Joi.string().trim().required(),
  color: Joi.string().trim().default('#07294e'),
  desc: Joi.string().trim().required(),
});

const themeWheelItemSchema = Joi.object({
  label: Joi.string().trim().required(),
  color: Joi.string().trim().default('#07294e'),
  pct: Joi.number().min(0).max(100).required(),
});

const contentSchema = Joi.object({
  introduction: Joi.object({ body: paragraphArray }).default({ body: [] }),
  plotSummary: Joi.object({ body: paragraphArray }).default({ body: [] }),
  summaryAnalysis: Joi.object({
    chapters: Joi.array().items(chapterSchema).default([]),
  }).default({ chapters: [] }),
  themes: Joi.array().items(themeSchema).default([]),
  quotes: Joi.array().items(quoteSchema).default([]),
  characters: Joi.array().items(characterSchema).default([]),
  terms: Joi.array().items(termSchema).default([]),
  symbols: Joi.array().items(symbolSchema).default([]),
  themeWheel: Joi.object({
    body: paragraphArray,
    themes: Joi.array().items(themeWheelItemSchema).default([]),
  }).default({ body: [], themes: [] }),
}).default({});

const literatureSchema = Joi.object({
  title: Joi.string().trim().required(),
  slug: Joi.string().trim().allow('').optional(),
  author: Joi.string().trim().allow('').default('Literary Palace'),
  tag: Joi.string().trim().allow('').default('Lit Guide'),
  category: Joi.string()
    .valid('All', 'History', 'Poetry', 'Authors', 'Novels', 'Dramas/Plays', 'Short Stories', 'Prose/Essays')
    .default('All'),
  excerpt: Joi.string().trim().allow('').default(''),
  content: Joi.alternatives().try(contentSchema, Joi.string().allow('')).optional(),
});

const literatureUpdateSchema = literatureSchema.fork(['title'], (schema) => schema.optional());

module.exports = {
  literatureSchema,
  literatureUpdateSchema,
};
