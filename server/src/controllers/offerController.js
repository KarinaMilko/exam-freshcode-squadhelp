const db = require('../models');
const BadRequestError = require('../errors/BadRequestError');
const NotFound = require('../errors/UserNotFoundError');
const CONSTANTS = require('./../constants');

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

module.exports.updateOffersStatus = async (req, res, next) => {
  const {
    body: { status },
    params: { id },
  } = req;

  const { OFFER_STATUS_APPROVED, OFFER_STATUS_PENDING, OFFER_STATUS_REJECTED } =
    CONSTANTS;

  try {
    const updateOffer = await db.Offers.findByPk(id);

    if (!updateOffer) {
      return next(new NotFound('Offer not found'));
    }

    const validStatuses = [
      OFFER_STATUS_APPROVED,
      OFFER_STATUS_PENDING,
      OFFER_STATUS_REJECTED,
    ];

    if (!validStatuses.includes(status)) {
      return next(new BadRequestError('Invalid status provided'));
    }

    updateOffer.status = status;
    await updateOffer.save();

    res.send(updateOffer);
  } catch (err) {
    next(err);
  }
};

module.exports.getCreatorOffers = async (req, res, next) => {
  const {
    query: { page = 1, results = 10 },
    tokenData: { userId },
  } = req;

  const limit = results;
  const offset = (page - 1) * results;

  try {
    const foundCreatorOffers = await db.Offers.findAll({
      limit,
      offset: offset ? offset : 0,
      where: { userId },
      raw: true,
    });
    res.send(foundCreatorOffers);
  } catch (err) {
    next(err);
  }
};

module.exports.getCustomerOffers = async (req, res, next) => {
  const {
    query: { page = 1, results = 10 },
    tokenData: { userId },
  } = req;

  const limit = results;
  const offset = (page - 1) * results;

  try {
    const foundCustomerOffers = await db.Offers.findAll({
      limit,
      offset: offset ? offset : 0,
      where: { userId, status: CONSTANTS.OFFER_STATUS_APPROVED },
      raw: true,
    });
    res.send(foundCustomerOffers);
  } catch (err) {
    next(err);
  }
};
