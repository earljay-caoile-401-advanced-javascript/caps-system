'use strict';

const globalEmitter = require('./events.js');
const faker = require('faker');

/**
 * emits a pickup event containing random order information every 5 seconds
 */
setInterval(() => {
  const order = {
    time: faker.date.recent(),
    store: `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };

  globalEmitter.emit('pickup', order);
}, 5000);

/**
 * listens for delivered events and responds with a confirmation event
 * @param {object} payload - object containing order information
 */
globalEmitter.on('delivered', (payload) => {
  console.log(
    `VENDOR says: "Thank you for delivering order ${payload.orderID}"\n`,
  );
  globalEmitter.emit('confirmation', `order ${payload.orderID}`);
});
