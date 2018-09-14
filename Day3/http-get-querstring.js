const http = require('http');
const querystring = require('querystring');


const server = http.createServer(function (req, res) {
    // console.log(req.url)
    const GET = {};
    let url;
    if (req.url.indexOf('?') !== -1) {
        let arr = req.url.split('?');
        //arr[0] => 地址  /aaa
        url = arr[0];
        //arr[1] => 数据 user=123&pass=456
        GET = querystring.parse(arr[1])

    } else {
        url = req.url
    }


    console.log(url, GET);
    res.write('aaa');
    res.end();
}).listen(8082);