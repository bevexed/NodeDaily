const express = require('express');
const expressStatic = require('express-static');
const bodyPerser = require('body-parser');

const server = express();
server.listen(8087);
server.use(bodyPerser.urlencoded({
    extended:true,
    limit: 2*1024*1024
}))
server.use('/',function (req,res,next) {
    console.log('b')
    next();
})
server.use('/',function (req,res,next) {
    console.log('a')
})
server.use(expressStatic('../www'))
