'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Contests',
      [
        {
          id: 1,
          orderId: 'ORD-001',
          userId: 53,
          contestType: 'name',
          title: 'Brand Name Contest',
          status: 'active',
          prize: 100,
          priority: 1,
        },
        {
          id: 2,
          orderId: 'ORD-002',
          userId: 37,
          contestType: 'tagline',
          title: 'Tagline Contest',
          status: 'active',
          prize: 150,
          priority: 2,
        },
        {
          id: 3,
          orderId: 'ORD-003',
          userId: 39,
          contestType: 'logo',
          title: 'Logo Design',
          status: 'completed',
          prize: 200,
          priority: 3,
        },
        {
          id: 4,
          orderId: 'ORD-004',
          userId: 35,
          contestType: 'name',
          title: 'Startup Naming',
          status: 'pending',
          prize: 120,
          priority: 4,
        },
        {
          id: 5,
          orderId: 'ORD-005',
          userId: 41,
          contestType: 'tagline',
          title: 'Catchy Slogan',
          status: 'active',
          prize: 130,
          priority: 5,
        },
        {
          id: 6,
          orderId: 'ORD-006',
          userId: 33,
          contestType: 'tagline',
          title: 'Catchy Slogan',
          status: 'active',
          prize: 130,
          priority: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contests', null, {});
  },
};
