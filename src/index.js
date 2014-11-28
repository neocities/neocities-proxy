var argv = require('optimist').argv
var redirect = require('./redirect.js')

var httpPort = argv.http_port ? argv.http_port : 80
var httpsPort = argv.https_port ? argv.https_port : 443

redirect({port: httpPort})

require('./proxy.js')