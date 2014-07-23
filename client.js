// Using: http://einaros.github.io/ws/

// configuration
var host = 'ws://127.0.0.1:8080';
var port = 8081;
var server = '127.0.0.1';

// includes
var http = require('http');
var url = require('url');

// initial connection to websockets
var WebSocket = require('ws');
var ws;

try {
    ws = new WebSocket(host);
} catch (e) {
    console.log("Error: %s", e.message);
}

// catching undefined exceptions
process.on('uncaughtException', function(err) {
    if (err.code == 'ECONNREFUSED') {
        console.log("Connection refused")
    } else {
        console.log("Unhandled exception: %s", err.code);
    }
});

// HTTP server
http.createServer(function (req, res) {
    // parse the query
    var queryData = url.parse(req.url, true).query;
    // if event was sent ...
	if (typeof queryData.event != 'undefined') {
	    console.log(queryData.event);	
	    try {
            // send the message
	        ws.send(queryData.event);
	    } catch (e) {
            // if connection not open, then reopen it and send the data
	        console.log(e.message)
	        if (e.message == 'not opened') {
	            try {
	                ws = new WebSocket(host);
	                ws.send(queryData.event);
	            } catch (e) {
	                console.log("Error after retry: %s", e.message);
	            }
	        }
	    }
	}
    // respond in HTML with the echo
	res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(queryData.event);
}).listen(port, server);


console.log('Server running at http://%s:%s', server, port);