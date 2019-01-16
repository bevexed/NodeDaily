# Node
* Node.js 不是一门语言
* Node.js 不是库、不是框架
* Node.js® 是一个基于 Chrome V8 引擎 的 JavaScript 运行时。
  * Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
 Node.js 这个 JavaScript 执行环境 提供了 一些 服务器 级别的 API
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

#### readFile
> writeFile(file, callback(err))
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

#### writeFile
> writeFile(file, text , callback(err))
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

#### readdir
> readdir(path, [option], callback)

### HTTP
#### http.createServer()
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
        ```js
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

### Path
> 操作路径
#### path.basename
> 获取指定文件的名字
```js
path.basename('文件名','要去除的后缀名')
```

#### path.dirname
> 获取路径

#### path.extname
> 获取扩展名

#### path.isAbsolute
> 判断是否是绝对路径

#### path.parse
> 获取 以上 4个 api 的返回值， 并以对象的方式返回

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
#### exports
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
#### module.exports
* 直接导出模块中的成员
* 后者覆盖前者

> import 可以用于 浏览器 模式

### npm
> node package manager
* [npm网站](www.npmjs.com)
#### 命令行工具
* npm init -y
* npm install
  * 简写 npm i
  * npm install —S 包名
  * npm install —D 包名
* npm uninstall
  * 简写 npm un
* npm config set registry 地址
  * 修改镜像源
    ```bash
    npm config set registry https://registry.npm.taobao.org
    ```
* npm config list
  * 查看配置
#### package.json
* 通过 npm init 来创建
  * npm init -y 快输创建
* dependencies
> 依赖项
* npm 5 以后 不需要 --save 也会自动加入 dependencies 中
#### package-lock.json
> npm 5 之后才会存在
* 每次安装包 都会 都会更新 package-lock.json 文件
  - 存储 所有包的 下载地址 （依赖信息）
  - 加快下载速度
* lock
  - 如果 重新 install 会下载最新版本
  - 锁定版本，防止自动升级
  

## Express
> 对原生 http 模块再次封装
### 安装
```bash
npm i express -S
```
### 初始化
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
### 路由
#### 引入 Router
```js
// router.js
const express = require('express')
const router = express.Router()
```

#### 把路由容器挂载在 app上
```js
// app.js
app.use(router)
```
#### 静态文件处理
* app.use(path, fn)
  * 参数1 : 路径的别名
  * 参数2 ：express.static(真实路径)
```js
// 1. 访问时需要带 '/public'
app.use('/public/',express.static('./public'))
// 2. 访问时 不需要 '/public'
app.use(express.static('./public'))
```
### query
> express 将 query 封装到了 res.query 中
* query 只能获取 get 请求的数据
```js
const query = req.query
```
### 重定向
```js
res.redirect(url)
```

### 获取 POST 请求体
#### 安装 [body-parser](https://www.npmjs.com/package/body-parser)
```bash
npm i body-parser -S
```
#### 配置
* 加入这个配置后，可以直接在 res.body 中直接获取 请求体数据
```js
const express = require('express')
const bodyParser = require('body-parser')
 
const app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```


### 配置模板 [art-template](http://aui.github.io/art-template/zh-cn/)
#### 安装
```bash
npm install --save art-template
npm install --save express-art-template
```

#### 应用
```js
const express = require('express');
const app = express();
app.engine('art', require('express-art-template'));
// 设置模板路径
app.set(views, {
    debug: process.env.NODE_ENV !== 'production'
});

app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
``` 

#### render
* express 默认为 Response 对象提供了 Render 方法，但是需要配置模板引擎才可以使用
```js
res.render(`html模板名`, `模板数据`)
```


### 修改模板默认文件夹
* app.use
  ```js
  app.use('views','你的路径')
  ```

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
#### 安装
```bash
npm i nodemon -g
```
  
## MongoDB [中文网](http://www.mongodb.org.cn/)
> 长的最像关系型数据库的非关系型数据库
* 数据库 => 数据库
* 数据表 => 集合（数组）
* 表记录 => 文档对象
* MongDB 不需要设置表结构
### 关系型数据库
* 通过 sql 语句来操作
* 在操作之前需要实现表结构
* 数据表支持约束行为
  - 唯一的
  - 主键
  - 默认值
  - 非空
### 非关系型数据库
* 数据库非常灵活
* 有的数据库就是 key-value 对

### 安装
> [mac环境mongodb安装与配置](http://www.mongodb.org.cn/)
### 启动
```bash
sudo mongod --dbpath='你的目录'
```
### 链接
```bash
sudo mongo
```
### 退出
```bash
exit
```
### 基层操作
#### 查看数据库
```bash
show bds
```
#### 查看当前链接的数据库
```bash
db
```
#### 切换到指定数据库
```bash
use 数据库名称
```

### 在 Node 中操作 mongodb 数据库
> [mongodb](https://www.npmjs.com/package/mongodb)
> [mongoose](https://mongoosejs.com/)
> [mongoose中文](https://mongoose.shujuwajue.com/guide/queries.html)
#### 安装
> 所有 API 都支持 Promise
```bash
npm i mongoose -S
```
#### 使用
```js
const mongoose = require('mongoose');
// 1. 链接数据库
// 指定链接的数据库不需要存在，当数据库连接上以后，会自动创建
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 2. 设计集合结构
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，过滤脏数据
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comment: [{body: String, data: Date}],
  date: {type: Date, default: Date.now},
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

// 3. 将文档结构发布为模型
// mongoose.model 将一个架构发布为 model
// 第一个参数：传入一个首字母为大写的名词表示你的数据库的名称，
//            mongoose 自动为你转换成小写的 名词复数集合 BLog => blogs
// 第二个参数：架构 Schame
const Blog = mongoose.model('Blog', blogSchema);

// 4.实例化
let newBlog = new Blog({
  title: 'String',
  author: 'String',
  body: 'String',
  hidden: true,
  meta: {
    votes: 1,
    favs: 2
  }
});

```
##### 添加数据
```js
newBlog.save((err,res)=>{
  if (err){
    console.log(err);
    console.log('保存失败');
  }else{
    console.log('保存成功');
    console.log(res);
  }

  })
```

##### 查询数据
* find
> 查询所有 返回数组
```js
Blog.find({},(err,res)=>{})
```
* findOne
> 查询一项
```js
Blog.findOne({},(err,res)=>{})
```

##### 删除数据
* findOneAndDelete
```js
Blog.findOneAndDelete({},(err,res)=>{})
```

##### 更新数据
* findOneAndUpdate
```js
Blog.findOneAndUpdate({},{},(err,res)=>{})
```

### 在 node 中使用 MySql
#### 安装
```bash
npm i mysql --save
```

## 封装异步 API
> 如果需要获取一个函数中异步操作的结果，则必须通过回调函数的方式来获取
### 回调函数
> 获取异步操作的结果
```js
let add = callback => {
  setTimeout( callback,1000)
}
add((x = 1, y = 2) => {
 return x + y
})
```
### 已知异步 API
- setTimeOut
- readFile
- writeFile
- ajax
### 封装异步 ajax
```js
ajax = (url,callback) => {
  let xml = new XMLHttpRequest();
  xml.onreadystatechange = () => {
    if (xml.readyState === 4) {
      callback(xml.response)
    }
  };
  xml.open('get', url, true);
  xml.send(null);
};
```
### JavaScript 事件循环


