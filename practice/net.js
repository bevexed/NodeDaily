const Net = require('net')

const Server = Net.createServer()

const ClientList = []

Server.on('connection', client => {

  client.name = client.remoteAddress + ':' + client.port // 记录当前 访问的服务器

  client.write('connect')
  client.write('\n') // 将数据发给客户端
  client.write('name' + ':' + client.name)

  ClientList.push(client) // 将所有 链接的服务器 保存起来

  client.on('data', data => { // 监听 数据
    const msg = data.toString() // 将 Buffer 转换为字符串
    sendMsg(msg, client)
  })

  client.on('end', function () { // 监听 断开连接
    const msg = client.name + '已下线'
    sendMsg(msg, client)
    client.destroy() // 销毁节点
    ClientList.splice(ClientList.indexOf(client), 1) // 消除垃圾索引
  })

  client.on('error', function (e) { // 监听 错误
    console.log(e)
  })

  // client.end()
})

const sendMsg = (msg, client) => {
  ClientList.forEach(item => {
    if (client === item) {
      return
    }
    if (item.writable) {
      return item.write(client.name + ':' + msg)
    }
    item.destroy()
  })
}

Server.listen(9000)
