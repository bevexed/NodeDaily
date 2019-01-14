/**
 * 1. 抄作文件数据 只操作数据
 */

const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, './db/fruit.json');

/*
 * 获取
 * @param {Function} callback 回调函数
 * @return Array
 * */
exports.find = find = callback => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data))
  })
};

/* 增
 * @param {Object} add 新增数据
 * @param {Function} callback 回调函数
 */
exports.add = (add, callback) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(data);
    let id = data.type[data.type.length - 1].id + 1;
    data.type.push({id, ...add});
    fs.writeFile(dbPath, JSON.stringify(data), err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
};

// 删

// 改
exports.update = (fruit, callback) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
      return callback(err)
    }
    data = JSON.parse(data);
    let newFruit = data.type.find(item => item.id === fruit.id);
    for (let [key, value] of Object.entries(fruit)) {
      newFruit[key] = value
    }
    fs.writeFile(dbPath, JSON.stringify(data), err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })

  })
};

// 查
