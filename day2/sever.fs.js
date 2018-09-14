const http = require('http');
const fs = require('fs');

const sever = http.createServer(function (req, res) {
    //req.url => './index.html'
    //读取 www/index.html => 'www/'+req.url
    let file_name = '../www/src/page' + req.url;
    fs.readFile(file_name, function (err, data) {
        if (err) {
            res.write('404');
            res.end()
        } else {
            res.write(data.toString());
            res.end()
        }
    });
}).listen(8087)