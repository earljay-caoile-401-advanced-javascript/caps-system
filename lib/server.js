'use strict';

const io = require('socket.io')(3000);
const logPayload = require('./logPayload.js');

/**
 * takes in a payload, calls a helper logger function, and converts it to a JSON object
 * @param {ArrayBuffer} payload - contains order information
 * @returns {object} JSON object converted from the payload
 */
const payloadHandler = (payload) => {
  const stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);
  logPayload(jsonPayload);
  return jsonPayload;
};

const csps = io.of('/csps');

/**
 * listens socket connection and communications, handles logs, and writes if necessary
 * @param {object} socket - socket connection from a client
 */
csps.on('connection', (socket) => {
  console.log('connected to socket', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`socket ${socket.id} joined room ${room}`);
  });

  socket.on('pickup', (payload) => {
    const jsonPayload = payloadHandler(payload);

    csps
      .to('driver')
      .emit(
        'in-transit',
        JSON.stringify({ event: 'in-transit', content: jsonPayload.content }),
      );
  });

  socket.on('in-transit', (payload) => {
    const jsonPayload = payloadHandler(payload);

    csps
      .to('vendor')
      .emit(
        'delivered',
        JSON.stringify({ event: 'delivered', content: jsonPayload.content }),
      );
  });

  socket.on('delivered', (payload) => {
    payloadHandler(payload);
    console.log();
  });
});
