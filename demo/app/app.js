const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'));

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));
app.use('/assets', express.static(path.join(__dirname, './views/register/assets/')));

app.use(router);

app.listen('9000', () => {
  console.log('running');
});
