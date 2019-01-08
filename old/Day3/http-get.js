const http = require('http')

const server = http.createServer(function (req, res) {
    // console.log(req.url)
    const GET = {};
    let url;
    if (req.url.indexOf('?') !== -1) {
        let arr = req.url.split('?');
        //arr[0] => 地址  /aaa
        url = arr[0];
        //arr[1] => 数据 user=123&pass=456
        let arr2 = arr[1].split('&');
        for (let i = 0; i < arr2.length; i++) {
            let arr3 = arr2[i].split('=');
            GET[arr3[0]] = arr3[1];
        }
    } else {
        url = req.url
    }


    console.log(url, GET)
}).listen(8082);