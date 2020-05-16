'use strict';

const io = require('socket.io-client');
const express = require('express');
const app = express();

const socket = io.connect('http://localhost:3000/db');

app.post('/delivery/:retailer/:code', (req, res) => {
  const content = {
    retailer: req.params.retailer,
    code: req.params.code,
  };

  const payload = {
    event: 'delivered',
    content: content,
  };
  console.log('delivering the following:', payload);
  socket.emit('package-delivery', payload);
  res.status(201).json(payload);
});

app.listen(8080, () => console.log('api is running on 8080'));
