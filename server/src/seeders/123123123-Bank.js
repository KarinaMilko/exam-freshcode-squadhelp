module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Banks',
      [
        {
          cardNumber: '4564654564564564',
          name: 'SquadHelp',
          expiry: '11/26',
          cvc: '453',
          balance: 0,
        },
        {
          cardNumber: '4111111111111111',
          name: 'yriy',
          expiry: '09/26',
          cvc: '505',
          balance: 5000,
        },
      ],
      {}
    );
  },
};
