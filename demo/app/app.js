const express = require('express');
const path = require('path');

const app = express();

app.use('/public/', express.static(path.join(__dirname, './public/')));

app.use('./node_modules/', express.static(path.join(__dirname, './node_modules')));

app.get('/', (req, res) => {
  res.send('404')
});

app.listen('9000', () => {
  console.log('running');
});
