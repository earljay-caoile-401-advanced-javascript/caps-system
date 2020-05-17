'use strict';

require('dotenv').config();
const port = process.env.QUEUE_SERVER_PORT || 3001;
const io = require('socket.io')(port);

console.log('Message Queue Server up and running on', port);
let messages = {};

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  socket.on('subscribe', (vendor) => {
    if (!messages[vendor]) {
      messages[vendor] = {};
    }
  });

  socket.on('getAll', (vendor) => {
    socket.join(vendor);
    const vendorEvents = messages[vendor];
    if (vendorEvents) {
      for (const index in vendorEvents) {
        const payload = vendorEvents[index];
        io.to(vendor).emit('delivered', payload);
      }
    }
  });

  socket.on('delivered', (payload) => {
    const { vendor, orderID } = payload;
    socket.join(vendor);
    if (!messages[vendor]) {
      messages[vendor] = {};
    }
    messages[vendor][orderID] = payload;
    io.emit(vendor).emit('delivered', payload);
  });

  socket.on('received', (payload) => {
    const { vendor, orderID } = payload;
    delete messages[vendor][orderID];
  });
});
