const express = require('express');
const router = express.Router();
const { getWatchList, addToWatchList, updWatchList, delWatchList } = require('../../controllers/watchListController');
const protect = require('../../middleware/authMiddleware');

router.route('/').get(protect, getWatchList).post(protect, addToWatchList);
router.delete('/:id', protect, delWatchList);

module.exports = router;
