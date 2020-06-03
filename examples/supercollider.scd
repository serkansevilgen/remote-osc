//OSCFunc.trace(true, true);

n = NetAddr("127.0.0.1", 57121); // udpServerAddress, udpServerPort -> client config.json

n.sendMsg("/hello", "World");

(
f = { |msg, time, addr|
    if(msg[0] != '/status.reply') {
        "time: % sender: %\nmessage: %\n".postf(time, addr, msg);
    }
};
thisProcess.addOSCRecvFunc(f);
);

//stop receiving
thisProcess.removeOSCRecvFunc(f);


//Sender of a dictionary with random values:

/*
a = ();

fork({
	loop {
		0.075.wait;
		[\posX, \posY, \posZ].do{ |key|
	var msg = {rrand(0.1, 1.0)}!3;
	for( msg[0], msg[2], { arg i;
		a.put(key, i)
	});
};
		a;
		n.sendMsg("/hello", a.asString);
	}
});
*/