'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [buyers] = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users" WHERE role = 'customer';`
    );

    await queryInterface.bulkInsert(
      'Contests',
      [
        {
          orderId: 'ORD-001',
          userId: buyers[0].id,
          contestType: 'name',
          title: 'Brand Name Contest',
          status: 'active',
          prize: 100,
          priority: 1,
        },
        {
          orderId: 'ORD-002',
          userId: buyers[1]?.id || buyers[0].id,
          contestType: 'tagline',
          title: 'Tagline Contest',
          status: 'active',
          prize: 150,
          priority: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contests', null, {});
  },
};
