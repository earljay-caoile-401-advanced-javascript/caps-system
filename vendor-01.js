'use strict';

const io = require('socket.io-client');
const socket = io.connect(`http://localhost:3001/`);

const vendorName = 'flower-shop';

console.log('Flower shop is up!');

socket.emit('subscribe', vendorName);
socket.emit('getAll', vendorName);

socket.on('delivered', (payload) => {
  socket.emit('received', payload);
  console.log('Thank you for delivering order', payload.orderID);
});
