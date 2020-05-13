'use strict';

const io = require('socket.io')(3000);
const { logPayload, convertPayload } = require('./handlers.js');
const csps = io.of('/csps');

/**
 * listens socket connection and communications, handles logs, and writes if necessary
 * @param {object} socket - socket connection from a client
 */
csps.on('connection', (socket) => {
  console.log('connected to socket', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`socket ${socket.id} joined room ${room}\n`);
  });

  socket.on('pickup', (payload) => {
    const jsonPayload = convertPayload(payload);
    logPayload(jsonPayload);

    csps
      .to('driver')
      .emit(
        'in-transit',
        JSON.stringify({ event: 'in-transit', content: jsonPayload.content }),
      );
  });

  socket.on('in-transit', (payload) => {
    const jsonPayload = convertPayload(payload);
    logPayload(jsonPayload);

    csps
      .to('vendor')
      .emit(
        'delivered',
        JSON.stringify({ event: 'delivered', content: jsonPayload.content }),
      );
  });

  socket.on('delivered', (payload) => {
    logPayload(convertPayload(payload));
    console.log();
  });
});
