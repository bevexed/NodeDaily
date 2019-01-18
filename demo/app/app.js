const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./routes/router');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());


// app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {
    // secure: true, // 设置此属性后，只有在 https 下才会 传输 cookie
    // maxAge: 1000 * 60 * 3
  }
}));

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'));

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));
app.use('/assets', express.static(path.join(__dirname, './views/register/assets/')));

app.use(router);

// 全局错误 处理
app.use((err, req, res, next) => {
  res.status(500).json({
    err_code: 500,
    message: err
  })

});

app.listen('9000', () => {
  console.log('running');
});
