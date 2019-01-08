const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');//只能解析数据，不能解析文件
const multer = require('multer');
const pathLib = require('path');
const fs = require('fs');
const ejs = require('ejs');
const jade = require('jade');



let server = express();

server.listen(8090);

//1.解析cookie
server.use(cookieParser('123'))

// 2.使用session
var arr=[];
for (let i = 0; i < 1000; i++) {
    arr.push('key_'+Math.random())
}
server.use(cookieSession({name: '123',keys: arr, maxAge:20*3600*1000}))

//3.post数据
server.use(bodyParser.urlencoded({extended:false}));
server.use(multer({dest:'../www/upload/'}).any());

//用户请求
server.use('/',function (req,res,next) {
    //1.获取文件名
    let pathName = req.files[0].path;
    console.log(req.files[0].originalname);
    //2.改名path + ext
    let rename = pathName + pathLib.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,rename,function (err) {
        if(err)
            res.send('fail');
        else
            res.send('success')
    })
    console.log(req.query,req.files,req.body,req.cookie,req.session,rename)
    next()
});

// 4.static数据
server.use(expressStatic('../www'));