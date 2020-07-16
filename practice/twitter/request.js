const http = require('http')
const assert = require('assert')

const req = http.request('http://localhost:7000/send', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
}, function (res) {
  res.setEncoding('utf8')
  let data = ""
  res.on('data', function (d) {
    data += d
  })
  res.on('end', function () {
    assert.strictEqual(data, '{"status":"ok","message":"Tweet received"}')
  })
})

req.write('tweet=test')
req.end()
