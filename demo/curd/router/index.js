const fs = require('fs');
const path = require('path');

module.exports = function router(app) {
  app.get('/index.html', (req, res) => {
    console.log(req);
    fs.readFile(path.join(__dirname, '../db/fruit.json'), 'utf-8', (err, data) => {
      if (err) {
        return console.log(err)
      }
      console.log(JSON.parse(data));
      res.render('index.html', {data: JSON.parse(data)})
    })
  })
};
