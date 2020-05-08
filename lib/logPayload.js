module.exports = (payload, eventName) => {
  if (typeof payload === 'object') {
    console.log(`EVENT`, eventName);
    Object.keys(payload).forEach((key) => {
      console.log(`- ${key}: ${payload[key]}`);
    });
    console.log();
  } else {
    console.log('EVENT', eventName, payload, '\n');
  }
};
