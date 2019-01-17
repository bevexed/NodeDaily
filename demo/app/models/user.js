const mongoose = require('mongoose');
const Scheam = mongoose.Schema;

mongoose.connect('mongodb://localhost/demoApp',{ useNewUrlParser: true });

let userSchema = new Scheam({
  email: {
    type: String,
    require: true
  },
  nikename: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  lastModifiedTime: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/pubic/img/avatar.svg'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date,
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  }

});

module.exports = mongoose.model('User', userSchema);
