const asyncHandler = require('express-async-handler');
const WatchList = require('../models/watchListModel');

// @desc GET all anime in the watch list
// @route GET /api/watchList
// @access PRIVATE
const getWatchList = asyncHandler(async(req, res) => {
  const watchList = await WatchList.find({ user: req.user.id });
  res.status(200).json(watchList);
});

// @desc add an anime to the watch list
// @route POST /api/watchList
// @access PRIVATE
const addToWatchList = asyncHandler(async(req, res) => {
  if (!req.body.anime)
  {
    res.status(400);
    throw new Error('Missing anime id');
  }
  const watchList = await WatchList.create({ user: req.user.id, anime: req.body.anime });
  res.status(201).json(watchList);
});

// @desc delete an anime from the watch list
// @route DELETE /api/watchList/id
// @access PRIVATE
const delWatchList = asyncHandler(async(req, res) => {
  const anime = await WatchList.findById(req.params.id);

  // check if the anime exists
  if (!anime)
  {
    res.status(404);
    throw new Error('anime not found');
  }

  // delete the anime associated to the user
  if (anime.user.toString() !== req.user.id)
  {
    res.status(401);
    throw new Error('Not authorized');
  }

  await anime.remove()
  res.status(200).json(anime);
});

module.exports = {
  getWatchList,
  addToWatchList,
  delWatchList
}
