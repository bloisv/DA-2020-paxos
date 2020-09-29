const MULTICAST_PORT = process.env.APP_MULTICAST_PORT;
const MULTICAST_ADDR = process.env.APP_MULTICAST_ADDR;

//Multicast Client receiving sent messages
var HOST_ADDR = process.env.APP_HOST_ADDR; //this is the receiver's own IP
var HOST_PORT = process.env.APP_HOST_PORT; //this is the receiver's own IP
var dgram = require('dgram');
var receiver = dgram.createSocket('udp4');

receiver.on('listening', function () {
    var address = receiver.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    receiver.setBroadcast(true)
    receiver.setMulticastTTL(128); 
    receiver.addMembership(MULTICAST_ADDR);
});

receiver.on('message', function (message, remote) {   
    console.log('Receiving from: ' + remote.address + ':' + remote.port +' - ' + message);
});

receiver.bind(MULTICAST_PORT, HOST_ADDR);