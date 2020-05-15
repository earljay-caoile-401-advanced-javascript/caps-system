'use strict';

const net = require('net');
const socket = net.Socket();
const faker = require('faker');

socket.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('Connected to TCP socker server!');
});

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

  socket.write(JSON.stringify({ event: 'pickup', content: order }));
}, 5000);

/**
 * listens for delivered events and responds with a confirmation event
 * @param {object} payload - object containing order information
 */
socket.on('data', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);

  if (jsonPayload.event === 'delivered') {
    console.log(
      `Thank you for delivering order ${jsonPayload.content.orderID}\n`,
    );
  }
});
