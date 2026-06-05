const Joi = require('joi');

const objectId = Joi.string().hex().length(24);

const listQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(500).default(100),
  search: Joi.string().trim().allow('').optional(),
  category: Joi.string().trim().allow('').optional(),
  region: Joi.string().trim().allow('').optional(),
  sort: Joi.string().trim().allow('').optional(),
});

const recentQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(24).default(6),
});

const slugParamSchema = Joi.object({
  slug: Joi.string().trim().min(1).required(),
});

const contentBodySchema = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  slug: Joi.string().trim().lowercase().max(220).allow('').optional(),
  author: Joi.string().trim().max(150).allow('').optional(),
  tag: Joi.string().trim().max(80).allow('').optional(),
  category: Joi.string().trim().max(80).allow('').optional(),
  region: Joi.string().trim().max(80).allow('').optional(),
  excerpt: Joi.string().trim().max(1000).allow('').optional(),
  content: Joi.alternatives().try(Joi.string().allow(''), Joi.object().unknown(true)).optional(),
}).unknown(true);

const searchQuerySchema = Joi.object({
  q: Joi.string().trim().allow('').default(''),
  limit: Joi.number().integer().min(1).max(20).default(6),
});

const bookmarkToggleSchema = Joi.object({
  articleId: objectId.required(),
  articleType: Joi.string().valid('literature', 'literary-term', 'world-literature', 'critical-perspective').required(),
  title: Joi.string().trim().min(1).max(250).required(),
  slug: Joi.string().trim().min(1).required(),
  category: Joi.string().trim().allow('', null).optional(),
});

module.exports = {
  listQuerySchema,
  recentQuerySchema,
  slugParamSchema,
  contentBodySchema,
  searchQuerySchema,
  bookmarkToggleSchema,
};
