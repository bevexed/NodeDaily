//fs- File System--文件读写模块
const fs = require('fs');
//fs.readeFile(文件名，回掉函数)
fs.readFile('test.text', function (err, data) {
    if (err) {
        alert('错了')
    } else {
        console.log(data.toString())
    }
});

//fs.writeFile(文件名，写入数据，回掉函数)
fs.writeFile('test.text','xxx',function (err) {
    console.log(err)
});
