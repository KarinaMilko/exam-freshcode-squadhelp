const db = require('../models');

module.exports.getAllOffersForModerator = async (req, res, next) => {
  const {
    query: { page = 1, results = 10 },
  } = req;

  const limit = results;
  const offset = (page - 1) * results;

  try {
    const foundOffers = await db.Offers.findAll({
      limit,
      offset: offset ? offset : 0,
      attributes: { exclude: ['userId'] },
      raw: true,
    });
    res.send(foundOffers);
  } catch (err) {
    next(err);
  }
};

module.exports.updateOffersStatus = () => {};

module.exports.getCreatorOffers = () => {};

module.exports.getCustomerOffers = () => {};
