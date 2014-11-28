var spdy = require('spdy')
var fs = require('fs')
var http = require('http')

var options = {
  key: fs.readFileSync(__dirname + '/../certs/server.key'),
  cert: fs.readFileSync(__dirname + '/../certs/server.crt'),
  ca: fs.readFileSync(__dirname + '/../certs/ca.crt'),

  // **optional** SPDY-specific options
  windowSize: 1024 * 1024, // Server's window size

  // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
  autoSpdy31: false
}

var server = spdy.createServer(options, function(req, res) {
  var options = {
    hostname: req.headers.host,
    port: 80,
    path: req.url,
    method: 'GET'
  }

  var proxyReq = http.request(options, function(proxyRes) {
    var headers = {'Server':'Neocities'}

    if(proxyRes.headers['content-length'])
      headers['Content-Length'] = proxyRes.headers['content-length']

    if(proxyRes.headers['content-type'])
      headers['Content-Type'] = proxyRes.headers['content-type']

    if(proxyRes.headers['etag'])
      headers['ETag'] = proxyRes.headers['etag']

    if(proxyRes.headers['last-modified'])
      headers['Last-Modified'] = proxyRes.headers['last-modified']

    res.writeHead(proxyRes.statusCode, headers)

    // TODO: Chunks pushed to cache too
    proxyRes.on('data', function (chunk) {
      res.write(chunk)
    })
  })

  proxyReq.end()
  //req.pipe(proxy)
})

server.listen(443)