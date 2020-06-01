const osc = require("osc"),
      WebSocket = require("ws");

// Create an Express server app
// and serve up a directory of static files.
const express = require("express");
const app = express();
const server = app.listen(8081);


// Listen for Web Socket requests.
var wss = new WebSocket.Server({
    server: server
});

// Listen for Web Socket connections.
wss.on("connection", function (socket) {
    var socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    socketPort.on("message", function (oscMsg) {
        console.log("An OSC Message was received!", oscMsg);
	socketPort.send({
	    address: oscMsg.address,
	    args: oscMsg.args
	});

    });
});

console.log('server started');
