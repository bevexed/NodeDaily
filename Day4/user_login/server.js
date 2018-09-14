const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const querystring = require('querystring');

let user = {};

const server = http.createServer(function (req, res) {
    //Get
    let obj = urlLib.parse(req.url, true);
    let url = obj.pathname;
    const GET = obj.query;
    console.log(GET);
    //Post
    let str = '';
    req.on('data', function (data) {
        str += data
    });
    req.on('end', function () {
        const POST = querystring.parse(str);
        console.log(url, GET, POST);
        if (url) {
            switch (GET.act) {
                case 'reg':
                    if (user[GET.user]) {
                        res.write('{"ok":false,"message":"用户已存在"}')
                    } else {
                        user[GET.user] = GET.pass;
                        res.write('{"ok":false,"message":"成功"}')
                    }
                    break;
                case 'login':
                    if (user[GET.user] === null) {
                        res.write('{"ok":false,"message":"查无此号"}')
                    } else {
                        res.write('{"ok":false,"message":"登录成功"}')
                    }
                    break;
                default:
                    res.write('{"ok":false,"message":"hehe"}')
            }
            res.end();
        } else {
            let file_name = '../www/src/page' + url;
            fs.readFile(file_name, function (err, data) {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }
                res.end();
            })
        }
    });

}).listen(8089);
