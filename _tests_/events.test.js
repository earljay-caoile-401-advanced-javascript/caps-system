'use strict';

const logPayload = require('../lib/logPayload.js');

describe('logPayload', () => {
  const pickupContent = {
    time: 'Thu May 07 2020 15:57:29 GMT-0700 (Pacific Daylight Time)',
    store: 'turn-key methodologies',
    orderID: 66432,
    customer: 'Alvis Buckridge',
    address: '89438 Wilkinson Ford, Lake Cristian, MT',
  };

  const consoleSpy = jest.spyOn(console, 'log');

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('can properly console log a pickup event', () => {
    logPayload(pickupContent, 'pickup');

    expect(consoleSpy.mock.calls[0][0]).toBe('pickup');
    expect(consoleSpy).toHaveBeenCalledTimes(7);

    let i = 1;
    Object.keys(pickupContent).forEach((key) => {
      expect(consoleSpy.mock.calls[i++][0]).toBe(
        `- ${key}: ${pickupContent[key]}`,
      );
    });
  });

  it('can properly console log a payload string (in-transit)', () => {
    logPayload(pickupContent, 'in-transit');

    expect(consoleSpy.mock.calls[0][0]).toBe('in-transit');
    expect(consoleSpy.mock.calls[0][1]).toBe('order');
    expect(consoleSpy.mock.calls[0][2]).toBe(pickupContent.orderID);
  });
});
