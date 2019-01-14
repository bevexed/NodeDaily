const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const Fruits = require("../fruit");

router.get('/index.html', (req, res) => {
  // fs.readFile(path.join(__dirname, '../db/fruit.json'), 'utf-8', (err, data) => {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   res.render('index.html', {data: JSON.parse(data)})
  // })
  Fruits.find((err, fruit) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    // res.send(fruit)
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
  console.log(req.body);

  // fs.readFile(path.join(__dirname, '../db/fruit.json'), 'utf-8', (err, data) => {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   data = JSON.parse(data);
  //   data.type.push({id: 1, ...req.body});
  //   fs.writeFile(path.join(__dirname, '../db/fruit.json'), JSON.stringify(data), (err, data) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     res.redirect('index.html')
  //   })
  // })
  Fruits.add(req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('index.html')
  })

});

router.get('/edit.html', (req, res) => {
  Fruits.findOneById(parseInt(req.query.id), (err, data, result) => {
    if (err) {
      return console.log(err)
    }
    res.render('edit.html', {...result})
  })
});

router.post('/edit.html', (req, res) => {
  // fs.readFile(path.join(__dirname, '../db/fruit.json'), 'utf-8', (err, data) => {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   data = JSON.parse(data);
  //   data.type.push({id: 1, ...req.body});
  //   fs.writeFile(path.join(__dirname, '../db/fruit.json'), JSON.stringify(data), (err, data) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     res.redirect('index.html')
  //   })
  // })
  Fruits.update(req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('index.html')
  })

});

router.get('/delete.html', (req, res) => {
  Fruits.delete(req.query.id, err => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('index.html')
  })
});


module.exports = router;
