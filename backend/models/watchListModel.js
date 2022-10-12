const mongoose = require('mongoose');

const watchListSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  anime: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WatchList', watchListSchema);
