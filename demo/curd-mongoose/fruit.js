/**
 * 1. 抄作文件数据 只操作数据
 */

const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, './db/fruit.json');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fruit', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const FruitSchema = new Schema({
  "fruitName": {
    type: String
  },
  "date": {
    type: Date,
    default: Date.now
  },
  "price": {
    type: Number,
  },
  "amount": {
    type: Number,
  }
});

module.exports = mongoose.model('Fruit', FruitSchema);
