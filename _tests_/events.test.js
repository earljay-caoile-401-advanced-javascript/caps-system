'use strict';

const logPayload = require('../lib/logPayload.js');

describe('logPayload', () => {
  const pickupPayload = {
    time: 'Thu May 07 2020 15:57:29 GMT-0700 (Pacific Daylight Time)',
    store: 'turn-key methodologies',
    orderID: 66432,
    customer: 'Alvis Buckridge',
    address: '89438 Wilkinson Ford, Lake Cristian, MT',
  };

  const strPayload = 'order 66432';
  const consoleSpy = jest.spyOn(console, 'log');

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('can properly console log a payload object (pickup)', () => {
    logPayload(pickupPayload, 'pickup');

    expect(consoleSpy).toHaveBeenCalledTimes(7);
    expect(consoleSpy.mock.calls[0][0]).toBe('EVENT');
    expect(consoleSpy.mock.calls[0][1]).toBe('pickup');

    let i = 1;
    Object.keys(pickupPayload).forEach((key) => {
      expect(consoleSpy.mock.calls[i++][0]).toBe(
        `- ${key}: ${pickupPayload[key]}`,
      );
    });
  });

  it('can properly console log a payload string (in-transit)', () => {
    logPayload(strPayload, 'in-transit');

    expect(consoleSpy.mock.calls[0][0]).toBe('EVENT');
    expect(consoleSpy.mock.calls[0][1]).toBe('in-transit');
    expect(consoleSpy.mock.calls[0][2]).toBe(strPayload);
  });

  it('can properly console log a payload string (delivered)', () => {
    logPayload(strPayload, 'delivered');

    expect(consoleSpy.mock.calls[0][0]).toBe('EVENT');
    expect(consoleSpy.mock.calls[0][1]).toBe('delivered');
    expect(consoleSpy.mock.calls[0][2]).toBe(strPayload);
  });
});
