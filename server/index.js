const WebSocket = require("ws");

// Create an Express server app
// and serve up a directory of static files.
const express = require("express");
const app = express();
const server = app.listen(8081);


// Listen for Web Socket requests.
var wss = new WebSocket.Server({
    server: server
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

console.log('server started');
