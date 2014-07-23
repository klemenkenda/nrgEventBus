// configuration
var port = 8080;
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: port });

// web socket server - broadcast function
wss.broadcast = function(data) {
    for(var i in this.clients)
        this.clients[i].send(data);
};

// web socket server
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Received&broadcasted: %s', message);
	    wss.broadcast(message);
    });    
});