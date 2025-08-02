const bcrypt = require('bcrypt');
const bd = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const AuthorizationError = require('../../errors/AuthorizationError');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(data, {
    where: { id: userId },
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }
  return updatedUser.dataValues;
};

module.exports.findUserForLogin = async (predicate, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, transaction });
  if (!result) {
    throw new AuthorizationError('Authentication error');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, transaction });
  if (!result) {
    throw new NotFound('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.userCreation = async data => {
  const newUser = await bd.Users.create(data);
  if (!newUser) {
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new AuthorizationError('Authentication error');
  }
};
