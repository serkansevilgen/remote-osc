const osc = require('osc');

const config = require('./config.json');
console.log(config);

const oscPort = new osc.WebSocketPort({
    url: `ws://${config.wsRemoteAddress}:${config.wsRemotePort}`,
    metadata: true
});

oscPort.open();

// Start a UDP server listen to messages from audio app
// and send it to the remote server
const udpPort = new osc.UDPPort({
    localAddress: config.udpServerAddress,
    localPort: config.udpServerPort,
    metadata: true
});

udpPort.open();



// When there is message in UDP port, send an OSC message to remote server
udpPort.on("ready", function () {
    udpPort.on("message", function (oscMsg, timeTag, info) {
	console.log(oscMsg);
	oscPort.send({
	    address: oscMsg.address,
	    args: oscMsg.args
	});
    });
});
// When there is message frome remote server send it to audio app
oscPort.on("ready", function () {
    oscPort.on("message", function (oscMsg) {
        console.log("An OSC Message was received!", oscMsg);
	udpPort.send({
	    address: oscMsg.address,
	    args: oscMsg.args
	}, config.appAddress, config.appPort);
    });
});

console.log("client started");











