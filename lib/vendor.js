'use strict';

const io = require('socket.io-client');
const port = 3000;
const cspsChannel = io.connect(`http://localhost:${port}/csps`);
cspsChannel.emit('join', 'vendor');
const faker = require('faker');

console.log('vendor is up on port', port);

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

  cspsChannel.emit(
    'pickup',
    JSON.stringify({ event: 'pickup', content: order }),
  );
}, 5000);

/**
 * listens for delivered events and responds with a confirmation event
 * @param {object} payload - object containing order information
 */
cspsChannel.on('delivered', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);

  if (jsonPayload.event === 'delivered') {
    console.log(
      `Thank you for delivering order ${jsonPayload.content.orderID}\n`,
    );
  }
});
