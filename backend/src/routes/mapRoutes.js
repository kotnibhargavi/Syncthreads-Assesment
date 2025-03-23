const express = require('express');
const { getMapConfig, getLocationById } = require('../controllers/mapController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/map/config
// Protected route - only accessible to logged-in users
router.get('/config', protect, getMapConfig);

// GET /api/map/location/:id
// Protected route - only accessible to logged-in users
router.get('/location/:id', protect, getLocationById);

module.exports = router;