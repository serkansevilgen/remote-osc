# server / client for remote OSC communication
## Description

This utility mainly targets for computer musicians and visual artists who want to collaborate real-time remotely.  

Multiple clients can listen to messages from apps (OSC only for now) and shares with other clients via server. There would be no need to configure UDP ports, DMZ, firewall, ect. in the network router.   Install and start server on a publicly accesible web server.

## Installation

in /client and /server folders 

```js
npm install  
```

Tested with node v14.0.0

## Usage

### Server
Start server
```js
node server/index.js
```
Server starts at address 0.0.0.0 and port 8081

### Client
Start client with optional config file.
```js
node client/index.js
node client/index.js './my-custom-config.json'
```
Edit /client/config.json for address/port info if necessary or create your own.
