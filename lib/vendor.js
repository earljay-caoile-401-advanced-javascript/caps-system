'use strict';

require('dotenv');
const net = require('net');
const socket = net.Socket();
const faker = require('faker');

socket.connect(
  { port: process.env.PORT || 3000, host: process.env.HOST || 'localhost' },
  () => {
    console.log('Connected to TCP socker server!');
  },
);

/**
 * emits a pickup event containing random order information every 5 seconds
 */
setInterval(() => {
  console.log('Is this going off?');
  const order = {
    time: faker.date.recent(),
    store: `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };

  socket.write(JSON.stringify({ event: 'pickup', content: order }));
}, 5000);

/**
 * listens for delivered events and responds with a confirmation event
 * @param {object} payload - object containing order information
 */
socket.on('delivered', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);

  console.log(
    `VENDOR says: "Thank you for delivering order ${jsonPayload.orderID}"\n`,
  );

  socket.write(
    JSON.stringify({
      event: 'confirmation',
      content: `delivered order ${jsonPayload.orderID}`,
    }),
  );
});
