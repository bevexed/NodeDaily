const http = require('http');
const fs = require('fs');
const art = require('art-template');
const path = require('path');
const url = require('url');

const feedBacks = [{name: 1, message: "123"}, {name: 2, message: "456"}];

http
  .createServer((req, res) => {
    let parseObj = url.parse(req.url, true);
    let query = parseObj.query;
    let pathname = parseObj.pathname;

    if (pathname.indexOf('message') > 0) {
      feedBacks.push({name: query.name, message: query.message});
      res.statusCode = 302;
      res.setHeader('Location', './index.html');
      res.end()
    }

    if (req.url) {
      fs.readFile(path.join(__dirname, pathname), (err, data) => {
        if (err) {
          return res.end('404 Not Found')
        }

        let HtmlStr = art.render(data.toString(), {feedBacks});
        res.end(HtmlStr)
      })
    }
  })
  .listen('9000', () => {
    console.log('running');
  });
