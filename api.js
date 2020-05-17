'use strict';

const io = require('socket.io-client');
const express = require('express');
const app = express();
const apiPort = process.env.API_PORT || 3000;
const socket = io.connect('http://localhost:3001/');

app.post('/delivery/:vendor/:orderID', (req, res) => {
  const payload = {
    vendor: req.params.vendor,
    orderID: req.params.orderID,
  };

  console.log('delivery', payload);
  socket.emit('delivered', payload);
  res.status(200).send('order succesfully delivered!');
});

app.listen(apiPort, () => console.log(`API Server up and running on ${apiPort}`));
