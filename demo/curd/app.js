const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const router = require('./router/index')

const app = express();

// 引入 body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

router(app)
// 引入 art-tempalte
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));



// 读取静态资源
app.use(express.static(path.join(__dirname, './')));

app.listen(3001, function () {
  console.log('running')
});
