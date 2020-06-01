const osc = require('osc');

process.argv[2];
const config_file = process.argv[2] ? process.argv[2] : './config.json'; 
const config = require(config_file);
console.log(config);

const oscPort = new osc.WebSocketPort({
    url: `ws://${config.serverAddress}:${config.serverPort}`,
    metadata: true
});

oscPort.open();

// Start a UDP server listen to messages from audio app
// and send it to the remote server
const udpPort = new osc.UDPPort({
    localAddress: config.clientAddress,
    localPort: config.clientPort,
    metadata: true
});

udpPort.open();



// When there is message in UDP port, send an OSC message to remote server
udpPort.on("ready", function () {
    udpPort.on("message", function (oscMsg, timeTag, info) {
        console.log("An OSC Message was received from APP!", oscMsg);
	oscPort.send({
	    address: oscMsg.address,
	    args: oscMsg.args
	});
    });
});
// When there is message frome remote server send it to audio app
oscPort.on("ready", function () {
    oscPort.on("message", function (oscMsg) {
        console.log("An OSC Message was received from SERVER!", oscMsg);
	udpPort.send({
	    address: oscMsg.address,
	    args: oscMsg.args
	}, config.appAddress, config.appPort);
    });
});

console.log("client started");











