'use strict';

// 3rd party dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const io = require('socket.io-client');
const cspsChannel = io.connect(`http://localhost:3000/csps`);
const faker = require('faker');
const app = express();

// 3rd party global middleware
app.use(cors());
app.use(morgan('dev'));

// own middleware
app.use(express.json());

let testStore = '1-206-flowers';

app.get('/', (req, res) => res.send('API is up! Hooray!'));

app.post('/pickup', (req, res, next) => {
  try {
    let order = req.body;
    if (!Object.keys(order).length) {
      order = {
        time: faker.date.recent(),
        store:
          testStore ||
          `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
        orderID: faker.random.number(),
        customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
      };
    }
    cspsChannel.emit('join', order.store);
    cspsChannel.emit('pickup', order);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  apiServer: app,
  start: (port) => {
    app.listen(port, () => console.log('running on', port));
  },
};
