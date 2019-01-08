const express = require('express');
const cookieParser = require('cookie-parser');
const expressStatic = require('express-static');
let cookies = express();

cookies.use(cookieParser())
cookies.use('/aaa/a.html',function (req, res) {
    console.log(req.cookies);
    console.log(req.signedCookie);
    //密钥
    req.secret='12321312323'
    //删除cookies
    // res.clearCookie()
    //发送cookie
    res.cookie('user','123',{path:'/aaa',maxAge:30*24*3600*1000,signed:true})
    res.send('ok')
});

cookies.use(expressStatic('../www'))

cookies.listen(8088);