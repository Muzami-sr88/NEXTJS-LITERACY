const express = require('express');
const router = express.Router();
const {
  getAllLiterature,
  getRecentLiterature,
  getLiteratureBySlug,
  createLiterature,
  updateLiterature,
  deleteLiterature,
} = require('../controllers/literatureController');
const validate = require('../middleware/validate');
const {
  listQuerySchema,
  recentQuerySchema,
  slugParamSchema,
  contentBodySchema,
} = require('../validations/commonSchemas');

router.route('/')
  .get(validate(listQuerySchema, 'query'), getAllLiterature)
  .post(validate(contentBodySchema), createLiterature);

router.get('/recent', validate(recentQuerySchema, 'query'), getRecentLiterature);

router.route('/:slug')
  .get(validate(slugParamSchema, 'params'), getLiteratureBySlug)
  .put(validate(slugParamSchema, 'params'), validate(contentBodySchema), updateLiterature)
  .delete(validate(slugParamSchema, 'params'), deleteLiterature);

module.exports = router;
