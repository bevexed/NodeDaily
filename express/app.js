// 1. 引入 express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// 2. 创建 服务器
const app = express();

// 引入 body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// 引入 art-tempalte
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));

// 读取静态资源
app.use(express.static(path.join(__dirname, './')));

const feedBacks = [{name: 1, message: "123"}, {name: 2, message: "456"}];

app.get('/index.html', (req, res) => {
  res.render('index.html', {feedBacks})
});

app.get('/add.html', (req, res) => {
  res.render('add.html')
});

app.post('/message.html', (req, res) => {
  feedBacks.push(req.body);
  res.redirect('/index.html')
});

// 3，监听
app.listen(9000, function () {
  console.log('running');
});




