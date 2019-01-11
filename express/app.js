// 1. 引入 express
const express = require('express');

// 2. 创建 服务器
const app = express();

app.get('/', function (req, res) {
  res.send('123')
});

// 3，监听
app.listen(3000, function () {
  console.log('running');
});




