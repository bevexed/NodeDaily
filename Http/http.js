// 1. 引入 http
const http = require('http');

// 2. 使用 http.createServer() 创建一个 web 服务器

const server = http.createServer();

/* 3. 服务器监听事件
 *  第一个参数 => 事件名(地址)
 *  第二个参数 => callback => request response
 *  request
 *    request.url 请求路径
 *  response
 *    response.write
 *    可以使用多次，但是最后一定 end 来结束 响应，否则 客户端 会一直等待
 *    response.end()
 *    将 数据 呈递给客户
 *
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



