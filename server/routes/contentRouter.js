const express = require('express');
const { protect } = require('../middleware/protect');
const makeCtrl = require('../controllers/contentController');
const validate = require('../middleware/validate');
const {
  listQuerySchema,
  recentQuerySchema,
  slugParamSchema,
  contentBodySchema,
} = require('../validations/commonSchemas');

function makeRouter(Model) {
  const router = express.Router();
  const { getAll, getRecent, getBySlug, create, update, remove } = makeCtrl(Model);

  router.get('/', validate(listQuerySchema, 'query'), getAll);
  router.get('/recent', validate(recentQuerySchema, 'query'), getRecent);
  router.get('/:slug', validate(slugParamSchema, 'params'), getBySlug);

  router.post('/', protect, validate(contentBodySchema), create);
  router.put('/:slug', protect, validate(slugParamSchema, 'params'), validate(contentBodySchema), update);
  router.delete('/:slug', protect, validate(slugParamSchema, 'params'), remove);

  return router;
}

module.exports = makeRouter;
