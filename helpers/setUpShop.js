module.exports = (vendor) => {
  const io = require('socket.io-client');
  const socket = io.connect(`http://localhost:3001/`);
  console.log(`${vendor} is up!`);

  socket.emit('subscribe', vendor);
  socket.emit('getAll', vendor);

  socket.on('delivered', (payload) => {
    socket.emit('received', payload);
    console.log('Thank you for delivering order', payload.orderID);
  });
};
