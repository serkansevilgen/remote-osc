OSCFunc.trace(true); 

n = NetAddr("127.0.0.1", 57121); // udpServerAddress, udpServerPort -> client config.json

n.sendMsg("/hello", "World");

