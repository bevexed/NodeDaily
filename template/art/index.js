const fs = require('fs');
const template = require('art-template');

fs.readFile('./template/art/index.html', (err, data) => {
  if (err) {
    return console.log(err);
  }
  fs.readdir('./', (err, res) => {
    if (err) {
      return console.log(err);
    }
    let t = template.render(data.toString(), {title: '123', name: res.toString()});
    console.log(t);
  });

});

