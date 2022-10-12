const mongoose = require('mongoose');

const usersModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pls add a name'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Pls add a password']
  },
  securityAnswer: {
    type: String,
    required: [true, 'Pls add an answer to a security question of your choice']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', usersModel);
