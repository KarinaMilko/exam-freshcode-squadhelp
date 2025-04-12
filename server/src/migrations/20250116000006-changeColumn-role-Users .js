module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('customer', 'creator', 'moderator'),
      allowNull: false,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('customer', 'creator'),
      allowNull: false,
    });
  },
};
