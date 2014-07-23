#nrgEventBus#
nrgEventBus is a HTML5 WebSockets (WS) based web bus, used for distribution of notices about the warnings and alarms in NRG4Cast project. 

Web application can connect to the WS server at ws://demo.nrg4cast.org:8080.

Messages consist of a JSON containing all the relevant event data:
*	Name [string] – name of the event
*	Type [num] – 0 – notice, 1 – warning, 2 – alarm
*	ConsumptionCentreId [string] – id of consumption centre
*	Msg[string] - message

Example of a message:
```
{"Name":"Missing data", "Type": 1, "ConsumptionCentreId": "Miren-lamp-0025.0007.0006", "Msg": "Data not received for 2 consecutive expected intervals." }
```

The followin JS can be used to connect to the WS server:

```
var socket;
function init() {
	var host = "ws://demo.nrg4cast.org:8080";
	try {
		socket = new WebSocket(host);
		log('WebSocket - status '+socket.readyState);
		socket.onopen    = function(msg) { 
			log("Welcome - status "+this.readyState); 
		};
		socket.onmessage = function(msg) { 
			log("Received: "+msg.data); 
		};
		socket.onclose   = function(msg) { 
			log("Disconnected - status "+this.readyState); 
		};
	}
	catch(ex){ 
		log(ex); 
	}
	$("msg").focus();
}

function quit(){
	if (socket != null) {
		log("Goodbye!");
		socket.close();
		socket=null;
	}
}

function reconnect() {
	quit();
	init();
}
```

client.js can be used for pushing events to the event bus via http requests. Example of ussage:
```
http://demo2.nrg4cast.org:1337?event={"Name":"Missing data", "Type": 1, "ConsumptionCentreId": "Miren-lamp-0025.0007.0006", "Msg": "Data not received for 2 consecutive expected intervals." }
```
