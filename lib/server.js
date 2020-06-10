'use strict';

const io = require('socket.io')(3000);
const logPayload = require('./logPayload.js');
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
    logPayload(payload, 'pickup');
    csps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logPayload(payload, 'in-transit');
    csps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logPayload(payload, 'delivered');
    console.log();

    csps.to(payload.store).emit('delivered', payload);
  });
});
