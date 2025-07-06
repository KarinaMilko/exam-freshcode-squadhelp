const ApplicationError = require('./ApplicationError');

class AuthorizationError extends ApplicationError {
  constructor(message) {
    super(message || 'Authorization error', 401);
  }
}

module.exports = AuthorizationError;
