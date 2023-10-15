module.exports = class UnAuthtorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
