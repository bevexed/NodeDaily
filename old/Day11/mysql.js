const mysql = require('mysql');

//链接mysql
/*
* createConnection('服务器'，‘用户名‘，’密码’，‘库’)；
* */
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'196521.fFf',
    database:'mytest'
})

//2.查询
/*
* query(干啥，回掉函数)
* */

db.query("SELECT * FROM `user_table`;",(err,data)=>{
    if(err)
        console.log('出错了',err);
    else
        console.log('成功');
        console.log(JSON.stringify(data))
});
