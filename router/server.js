const http = require('http');
const path = require('path');
const readStaticFile = require('./fileStatic')

http.createServer(async(req, res)=>{
  let urlString = req.url;
  let filePathName = path.join(__dirname, 'static',urlString)

  let { data,mimeType } = await readStaticFile(filePathName)
  res.writeHead(200,{'Content-Type':mimeType})
  res.write(data);
  res.end()
}).listen(8080,()=>console.log('hellow'))
