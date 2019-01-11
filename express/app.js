// 1. 引入 express
const express = require('express');
const path = require('path');

// 2. 创建 服务器
const app = express();

// 引入 art-tempalte
app.engine('html', require('express-art-template'));
app.set('views',path.join(__dirname, './views'));

// 读取静态资源
app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => {
  res.render('404.html')
});

// 3，监听
app.listen(3000, function () {
  console.log('running');
});




