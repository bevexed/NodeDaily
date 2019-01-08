const fs = require('fs')

// 第一个参数 => 文件路径
// 第二个参数 => 要写入的文件内容
// 第三个参数 => 回调函数 => err
// 没有文件 => 创建新文件

fs.writeFile('./File System/demo.text','12345',(err)=>{
  console.log(err);
})
