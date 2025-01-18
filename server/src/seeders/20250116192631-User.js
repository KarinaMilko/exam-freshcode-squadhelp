'use strict';

const bcrypt = require('bcrypt');
const { SALT_ROUNDS, CUSTOMER, CREATOR } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Buyer',
          lastName: 'Buyerovych',
          displayName: 'buyerdn',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'buyer@gmail.com',
          role: CUSTOMER,
        },
        {
          firstName: 'Creative',
          lastName: 'Creatovych',
          displayName: 'creativedn',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'creative@gmail.com',
          role: CREATOR,
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
          [Sequelize.Op.or]: ['buyer@gmail.com', 'creative@gmail.com'],
        },
      },
      {}
    );
  },
};
