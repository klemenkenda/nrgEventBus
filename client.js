// http://einaros.github.io/ws/

var WebSocket = require('ws')
  , ws = new WebSocket('ws://127.0.0.1:8080');

var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
	var queryData = url.parse(req.url, true).query;	
	if (typeof queryData.event != 'undefined') {
	  console.log(queryData.event);	
  	ws.send(queryData.event);
	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(queryData.event);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');