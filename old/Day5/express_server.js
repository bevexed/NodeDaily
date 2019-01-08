const express = require('express');
const expressStatic = require('express-static');
const server = express();

const users = {
    '123': '456789'
};

server.use('/login', function (req, res) {
    console.log(req.query);//GET
    let user = req.query['user'];
    let pass = req.query['pass'];
    console.log(users[user]);
    if (users[user] === undefined) {
        res.send({ok: false, msg: '用户不纯在'})
    } else {
        if (users[user] !== pass) {
            res.send({ok: false, msg: '密码错误'})
        } else {
            res.send({ok: true, msg: '成功'})
        }
    }
});
server.listen(8086);
server.use(expressStatic('../www'));


