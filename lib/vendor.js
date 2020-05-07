'use strict';

const globalEmitter = require('./events.js');
const faker = require('faker');

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

globalEmitter.on('delivered', (payload) => {
  console.log(
    `VENDOR says: "Thank you for delivering order ${payload.orderID}"\n`,
  );
  globalEmitter.emit('confirmation', `order ${payload.orderID}`);
});
