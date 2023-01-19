module.exports = () =>
  Math.floor((1 + Math.random()) * 0x100)
    .toString(16)
    .substring(1);