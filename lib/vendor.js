'use strict';

const io = require('socket.io-client');
const port = 3000;
const cspsChannel = io.connect(`http://localhost:${port}/csps`);
const faker = require('faker');

let store = '1-206-flowers';

/**
 * emits a pickup event containing random order information every 5 seconds
 */
setInterval(() => {
  const order = {
    time: faker.date.recent(),
    store: store || `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };

  cspsChannel.emit('join', order.store);
  cspsChannel.emit('pickup', order);
}, 5000);

/**
 * listens for delivered events and responds with a confirmation event
 * @param {object} payload - object containing order information
 */
cspsChannel.on('delivered', (payload) => {
  console.log(`Thank you for delivering order ${payload.orderID}\n`);
});
