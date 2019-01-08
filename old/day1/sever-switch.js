//http  协议

//response  => 响应信息
//request => 请求信息
/*
    1.req.url 请求地址
*/
const http = require('http');
//1.创建服务器
const server =  http.createServer(function (req,res) {
    console.log(req.url);
    switch (req.url) {
        case '/1.html':
            res.write('1');
            break;
        case '/2.html':
            res.write('2');
            break;
        default:
            res.write('404');
            break;
    }

    res.end();
});

//监听----listen
server.listen(8087);