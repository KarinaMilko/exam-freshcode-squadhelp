'use strict';

const bcrypt = require('bcrypt');
const { SALT_ROUNDS, MODERATOR } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Moderator',
          lastName: 'Moderatorovych',
          displayName: 'moderatordn',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'moderator@gmail.com',
          role: MODERATOR,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Users',
      {
        email: {
          [Sequelize.Op.or]: ['moderator@gmail.com'],
        },
      },
      {}
    );
  },
};
