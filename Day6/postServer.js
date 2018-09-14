const express = require('express');
const expressStatic = require('express-static');
const bodyParser = require('body-parser')
const server = express();
server.listen(8087);

server.use(bodyParser.urlencoded({
    extended:true, //扩展模式
    limit: 2*1024*1024//2M 
}));

server.use('/login',function (req,res) {
    console.log(req.body);
    res.send({'ok':123});
});

server.use(expressStatic('../www'));