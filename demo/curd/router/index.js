const fs = require('fs');
const path = require('path');
const express = require('express')
const router = express.Router()

router.get('/index.html', (req, res) => {
  console.log(req);
  fs.readFile(path.join(__dirname, '../db/fruit.json'), 'utf-8', (err, data) => {
    if (err) {
      return console.log(err)
    }
    console.log(JSON.parse(data));
    res.render('index.html', {data: JSON.parse(data)})
  })
})

module.exports = router
