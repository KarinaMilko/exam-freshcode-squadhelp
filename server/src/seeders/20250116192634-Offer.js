'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Offers',
      [
        {
          userId: 53,
          contestId: 1,
          text: 'Offer 1',
          fileName: null,
          originalFileName: null,
          status: 'pending',
        },
        {
          userId: 37,
          contestId: 2,
          text: 'Offer 2',
          fileName: 'file2.png',
          originalFileName: 'original2.png',
          status: 'approved',
        },
        {
          userId: 39,
          contestId: 3,
          text: 'Offer 3',
          fileName: null,
          originalFileName: null,
          status: 'rejected',
        },
        {
          userId: 35,
          contestId: 4,
          text: 'Offer 4',
          fileName: 'file4.pdf',
          originalFileName: 'original4.pdf',
          status: 'pending',
        },
        {
          userId: 41,
          contestId: 5,
          text: 'Offer 5',
          fileName: 'file5.docx',
          originalFileName: 'original5.docx',
          status: 'approved',
        },
        {
          userId: 33,
          contestId: 6,
          text: 'Offer 6',
          fileName: null,
          originalFileName: null,
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
