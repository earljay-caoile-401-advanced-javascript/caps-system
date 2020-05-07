'use strict';
const globalEmitter = require('./events.js');
const faker = require('faker');

setInterval(() => {
  const payload = {
    time: faker.date.recent(),
    store: `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };

  globalEmitter.emit('pickup', payload);
}, 5000);
