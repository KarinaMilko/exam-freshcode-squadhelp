'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Offers', 'moderationStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Offers', 'moderationStatus');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Offers_moderationStatus";'
    );
  },
};
