# Node
* Node.js 不是一门语言
* Node.js 不是库、不是框架
* Node.js® 是一个基于 Chrome V8 引擎 的 JavaScript 运行时。
  * Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* Node.js 这个 JavaScript 执行环境 提供了 一些 服务器 级别的 API
  * 文件读写
  * 网络服务的构建
  * 网络通信
  * http 服务器
* Node.js use an event-driven,non-blocking I/O modal that makes it lightweight and efficient.
  * event-driven ：事件驱动
  * non-blocking I/O ： 非阻塞模型（异步）
  * lightweight and efficient
* 思想
  * B/S 编程模型
    * Browser - Server
    * back - end
  * 模块化编程
    * RequireJS
    * SeaJS
    * @import()
  * 异步编程
    * 回调函数
* 文件名不可以使用 node.js

## 核心模块
### File System
> 文件操作,
* fs模块读取文件的相对路径是以启动server.js的位置为基准的，而不是以server.js文件的位置。
* readFile(file，callback(err,data))
  ```js
    // 1. 引入 fs 模块
    const fs = require('fs');

    /* 2. 读取文件
     *  第一个参数 => 要读取的文件
     *  第二个参数 => 回调函数 => err,data
     */
    fs.readFile('./README.md', (err, data) => {
      console.log(`data:${data}, err:${err}`);
    })
  ```
* writeFile(file, text , callback(err))
  ```js
    const fs = require('fs')

    // 第一个参数 => 文件路径
    // 第二个参数 => 要写入的文件内容
    // 第三个参数 => 回调函数 => err
    // 没有文件 => 创建新文件

    fs.writeFile('./File System/demo.text','12345',(err)=>{
      console.log(err);
    })
  ```
#### HTTP
* http.createServer()
  * 返回 一个 Server 对象
    * server.on('request', (req, res) => {})
      * request.url : 请求路径
      * response.write
        * 可以使用多次，但是最后一定 end 来结束 响应，否则 客户端 会一直等待
        * 只能传递 二进制类型数据 或 字符串
      * response.end() : 将 数据 呈递给客户
  ```js
    // 1. 引入 http
    const http = require('http');

    // 2. 使用 http.createServer() 创建一个 web 服务器

    const server = http.createServer();

    /* 3. 服务器监听事件
     *  第一个参数 => 事件名(地址)
     *  第二个参数 => callback => request response
    */
    server.on('request', (req, res) => {
      console.log(req.url);
      res.write(`hellow node.js`);
      res.end()
    });

    // 4. 绑定端口号，启动服务器
    server.listen(9000, () => {
      console.log('服务器已启动');
    });
  ```

## 模块化
### require
* 用来加载模块并执行文件
  * 具名核心模块 ：
    * fs、http ， 直接引用
  * 自定义模块 ：
    * 写相对路径 ./ 不能省略
    * 可以直接引用 JS 文件
    * 可以省略后缀名

* 拿到加载文件中的导出对象


