module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Conversations',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        creatorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        customerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        blackListCreator: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        blackListCustomer: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        favoriteCreator: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        favoriteCustomer: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        uniqueKeys: {
          unique_creator_customer: {
            fields: ['creatorId', 'customerId'],
          },
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Conversations');
  },
};
