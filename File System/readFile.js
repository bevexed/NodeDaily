// 1. 引入 fs 模块
const fs = require('fs');

/* 2. 读取文件
 *  第一个参数 => 要读取的文件
 *  第二个参数 => 回调函数 => err,data
 */
fs.readFile('./README.md', (err, data) => {
  console.log(`data:${data}, err:${err}`);
});


