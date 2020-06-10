'use strict';

module.exports = (vendor) => {
  require('dotenv').config();
  const port = process.env.QUEUE_SERVER_PORT || 3001;

  const io = require('socket.io-client');
  const socket = io.connect(`http://localhost:${port}/`);
  console.log(`${vendor} is up!`);

  socket.emit('subscribe', vendor);
  socket.emit('getAll', vendor);

  socket.on('delivered', (payload) => {
    socket.emit('received', payload);
    console.log('Thank you for delivering order', payload.orderID);
  });
};
