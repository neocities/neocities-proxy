var http = require('http')
var fs = require('fs')
var ejs = require('ejs')
var path = require('path')

var appDir = path.dirname(require.main.filename)

var redirectTemplate = fs.readFileSync(appDir+'/../templates/redirect.ejs', 'utf8')

function start(opts){
  http.createServer(function (req, res) {
    var resHtml = ejs.render(redirectTemplate, {host: req.headers.host})

    res.writeHead(301, {
      'Location': 'https://'+req.headers.host,
      'Content-Type': 'text/html; charset=UTF-8',
      'Server': 'Neocities',
      'Content-Length': resHtml.length
    })
    res.end(resHtml)
  }).listen(opts.port)
}

module.exports = start