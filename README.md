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
> 文件操作
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

* readdir(path, [option], callback)

### HTTP
* http.createServer()
  * 返回 一个 Server 对象
    * server.on('request', (req, res) => {})
      * request.url : 请求路径
      * res.setHeader()
        * 设置响应头
          * Content-Type
            * text/plain : 普通文本
            * text/html  : html 格式
        * 重定向
          * Location
            * form 表单提交的 猫腻
          ```ja
            res.statusCode = 302 // 临时重定向
            res.setHeader('Location', 'url')
          ```
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
### URL
> 获取 url 中的 query 等参数
* url.parse(req.url,true)

### OS
> 操作系统信息


## 模块化
> 同时具有 文件作用域 通信规则
* 在 Node 中每个模块内部都有一个自己的 module 对象
* 在 module 中有一个 exports 对象
* 在文件的 底部默认 有 return module.exports
* 为了简化 操作，Node 中的每一个模块 都有 let exports = module.exports

### require
> 用来加载模块并执行文件
* 路径标识符
  * 具名核心模块 ：
    * fs、http ， 直接引用
  * 第三方模块 ：
    * 先找当前文件所属目录中的 node_module 中的 目录
    * 再去找 package.json 文件中的 main 属性
      * main 中记录了 第三方模块的 入口
    * 如果 不存在 package.json,会默认加载 index.js
    * 如果 index.js 找不到，则跳至 上一级目录 中继续查找
  * 自定义模块 ：
    * 写相对路径 ./ 不能省略
    * 可以直接引用 JS 文件
    * 可以省略后缀名
* 拿到加载文件中的导出对象 module.exports
* 优先从 缓存 加载，避免重复加载，提高代码加载效率

### exports
> 导出对象
* exports
  * 挂载的方式导出
  * exports.xxx = xxx 等价于 module.exports.xxx = xxx
  * 不可以直接给 exports 重新赋值
    * Node 中的每一个模块 都有 let exports = module.exports
    * 重新赋值后，改变了 exports 的引用，exports 不在 指向 module.exports
    * 在文件的 底部默认 有 return module.exports, 所以 依旧可以使用 module.exports.xxx = xxx 来继续导出值
  ```js
    exports.a = 1
    exports.b = () => {}
    exports.c = '123'
  ```
* module.exports
  * 直接导出模块中的成员
  * 后者覆盖前者

> import 可以用于 浏览器 模式

### npm
> node package manager
* [npm网站](www.npmjs.com)
* 命令行工具
  * npm init -y
  * npm install
    * 简写 npm i
    * npm install —S 包名
    * npm install —D 包名
  * npm uninstall
    * 简写 npm un
  * npm config set registry 地址
    * 修改镜像源
    * npm config set registry https://registry.npm.taobao.org
  * npm config list
    * 查看配置
* package.json
  * 通过 npm init 来创建
    * npm init -y 快输创建
  * dependencies
    > 依赖项

## Express
> 对原生 http 模块再次封装
* 安装
  ```bash
  npm i express -S
  ```
* init
  ```js
  // 1. 引入 express
  const express = require('express');

  // 2. 创建 服务器
  const app = express();

  app.get('/', function (req, res) {
    res.send('123')
  });

  // 3，监听
  app.listen(3000, function () {
    console.log('running');
  });
  ```
* 公开指定目录
  ```js
    app.use('/public',express.static('./public'))
  ```
* query


## IP 地址 和 端口号
* 域名 => DNS => ip地址 => 服务器 => 端口号 => 应用程序
* 所有联网的程序都需要占用一个端口号
* 计算机中只有一个物理网卡，并且在一个局域网中，网卡的地址必须是唯一的
* 网卡是通过唯一的 IP 来进行定位的

### 端口号
> 用来定位具体的应用程序
* 端口号范围 0 - 65536
* 最好不要使用一些 知名 的端口号
* 可以同时开启多个端口号

### IP 地址
> 用来定位计算机

### 服务器
> 一台 24小时 不关机的电脑
* 默认发送 utf-8 编码的内容
* 中文操作系统 默认 gdk
* res.setHeader('Content-Type', 'text/plain; charset=utf-8')

## 第三方工具
### nodemon
> 自动监视服务器文件，当服务器文件发生变化时，自动重启服务器
* 安装
  ```bash
  npm i nodemon -g
  ```

