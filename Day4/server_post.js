const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const urlLib = require('url');

const sevrver = http.createServer(function (req,res) {
    //Post -- req
    let str = '';
    req.on('data',function (data) {
        str += data;
    });
    req.on('end',function () {
        const Post = querystring.parse(str)
        console.log(Post)
    });

}).listen(8080);