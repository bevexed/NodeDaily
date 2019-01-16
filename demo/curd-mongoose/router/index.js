const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const Fruits = require("../fruit");

router.get('/index.html', (req, res) => {
  Fruits.find((err, fruit) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.render('index.html', {data: fruit})
  })
});

router.get('/add.html', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/fruit.json'), 'utf-8', (err, data) => {
    if (err) {
      return console.log(err)
    }
    res.render('add.html', {data: JSON.parse(data)})
  })
});

router.post('/add.html', (req, res) => {
  new Fruits(req.body).save((err, res) => {
    console.log(err);
    console.log(res);
  });
  res.redirect('index.html')

});

router.get('/edit.html', (req, res) => {
  Fruits.findById(req.query.id, (err, data) => {
    if (err) {
      return console.log(err)
    }
    res.render('edit.html', {data})
  })
});

router.post('/edit.html', (req, res) => {
  Fruits.findOneAndUpdate(req.body.id, req.body, err=> {
      if (err) {
        return res.status(500).send('Server error')
      }
      res.redirect('index.html')
    }
  )

});

router.get('/delete.html', (req, res) => {
  Fruits.findOneAndDelete(req.query.id, err => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('index.html')
  })
});


module.exports = router;
