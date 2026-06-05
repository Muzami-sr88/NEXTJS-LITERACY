const express = require('express');
const router = express.Router();

const literatureController = require('../controllers/literatureController');
const validate = require('../middleware/validate');
const {
  literatureSchema,
  literatureUpdateSchema,
} = require('../validators/literatureValidator');

// Public routes
router.get('/', literatureController.getAllLiterature);
router.get('/recent', literatureController.getRecentLiterature);
router.get('/:slug', literatureController.getLiteratureBySlug);

// Admin routes
router.post('/', validate(literatureSchema), literatureController.createLiterature);
router.put('/:slug', validate(literatureUpdateSchema), literatureController.updateLiterature);
router.delete('/:slug', literatureController.deleteLiterature);

module.exports = router;
