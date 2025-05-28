'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [contests] = await queryInterface.sequelize.query(
      `SELECT id FROM "Contests" ORDER BY id ASC;`
    );

    const [creators] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE role = 'creator' ORDER BY id ASC;`
    );

    await queryInterface.bulkInsert(
      'Offers',
      [
        {
          userId: creators[0]?.id,
          contestId: contests[0]?.id,
          text: 'Offer 1',
          fileName: null,
          originalFileName: null,
          status: 'pending',
        },
        {
          userId: creators[1]?.id || creators[0]?.id,
          contestId: contests[1]?.id,
          text: 'Offer 2',
          fileName: 'file2.png',
          originalFileName: 'original2.png',
          status: 'approved',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Offers', null, {});
  },
};
