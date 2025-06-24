const { Op } = require('sequelize');
const db = require('../models');
const BadRequestError = require('../errors/BadRequestError');
const NotFound = require('../errors/UserNotFoundError');
const CONSTANTS = require('./../constants');
const { sendOffersMail } = require('./../../services/sendOffersMail');

module.exports.getAllOffersForModerator = async (req, res, next) => {
  const {
    query: { page = 1, results = 10, status },
  } = req;

  const limit = Number(results) || 10;
  const offset = (Number(page) - 1) * limit;

  try {
    const where = {};
    if (status && status.trim() !== '') {
      where.status = status;
    }

    const { count, rows } = await db.Offers.findAndCountAll({
      limit,
      offset: offset ? offset : 0,
      attributes: { exclude: ['userId'] },
      where,
    });

    const totalPages = Math.ceil(count / limit);

    res.send({ offers: rows, total: count, page: Number(page), totalPages });
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
    const updateOffer = await db.Offers.findByPk(id, {
      include: [
        {
          model: db.Contests,
          attributes: ['id'],
        },
        {
          model: db.Users,
          attributes: ['email'],
          where: { role: 'creator' },
          required: false,
        },
      ],
    });

    if (!updateOffer) {
      return next(new NotFound('Offer not found'));
    }

    if (updateOffer.status !== OFFER_STATUS_PENDING) {
      return next(new BadRequestError('Only pending offers can be updated'));
    }

    const validStatuses = [OFFER_STATUS_APPROVED, OFFER_STATUS_REJECTED];

    if (!validStatuses.includes(status)) {
      return next(new BadRequestError('Invalid status provided'));
    }

    await updateOffer.update({ status });

    if (status === OFFER_STATUS_APPROVED) {
      await db.Offers.update(
        { status: OFFER_STATUS_REJECTED },
        {
          where: {
            contestId: updateOffer.contestId,
            id: { [Op.ne]: id },
          },
        }
      );
    }
    if (status === OFFER_STATUS_APPROVED || status === OFFER_STATUS_REJECTED) {
      if (updateOffer.User && updateOffer.User.email) {
        await sendOffersMail(updateOffer.User.email, status);
      }
    }
    res.send(updateOffer);
  } catch (err) {
    next(err);
  }
};
