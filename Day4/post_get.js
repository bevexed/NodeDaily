const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');
const server = http.createServer(function (req, res) {
    //Get
    let obj = urlLib.parse(req.url, true);
    let url = obj.pathname;
    const GET = obj.query;

    //Post
    let str = '';
    req.on('data', function (data) {
        str += data
    })
    req.on('end', function () {
        const POST = querystring.parse(str)
        console.log(url,GET,POST)
        let file_name = '../www/src/page'+url;
        fs.readFile(file_name,function (err,data) {
            if (err){
                res.write('404');
            } else{
                res.write(data);
            }
            res.end();
        })
    })

}).listen(8080);