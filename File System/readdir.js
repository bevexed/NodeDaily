const fs = require('fs')

fs.readdir('./',function (err,data) {
  console.log(err, data);
})
