'use strict';

require('dotenv').config();
const apiPort = process.env.API_PORT || 3000;
const queuePort = process.env.QUEUE_SERVER_PORT || 3001;

const notFoundHandler = require('./lib/middleware/404.js');
const errorHandler = require('./lib//middleware/500.js');

const express = require('express');
const app = express();

const io = require('socket.io-client');
const socket = io.connect(`http://localhost:${queuePort}/`);

app.post('/delivery/:vendor/:orderID', (req, res, next) => {
  try {
    const payload = {
      vendor: req.params.vendor,
      orderID: req.params.orderID,
    };

    console.log('delivery', payload);
    socket.emit('delivered', payload);
    res.status(200).send('order succesfully delivered!');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use('*', notFoundHandler);
app.use(errorHandler);

app.listen(apiPort, () =>
  console.log(`API Server up and running on ${apiPort}`),
);
