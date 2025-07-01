const db = require('../models');
const BadRequestError = require('../errors/BadRequestError');
const NotFound = require('../errors/UserNotFoundError');
const CONSTANTS = require('./../constants');
const { sendOffersMail } = require('./../../services/sendOffersMail');

module.exports.getAllOffersForModerator = async (req, res, next) => {
  const {
    query: { page = 1, results = 10, moderationStatus },
  } = req;

  const limit = Number(results) || 10;
  const offset = (Number(page) - 1) * limit;

  try {
    const where = {};
    if (moderationStatus && moderationStatus.trim() !== '') {
      where.moderationStatus = moderationStatus;
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

    if (updateOffer.moderationStatus !== OFFER_STATUS_PENDING) {
      return next(new BadRequestError('Only pending offers can be updated'));
    }

    const validStatuses = [OFFER_STATUS_APPROVED, OFFER_STATUS_REJECTED];

    if (!validStatuses.includes(status)) {
      return next(new BadRequestError('Invalid status provided'));
    }

    await updateOffer.update({ moderationStatus: status });

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

module.exports.getApprovedOffersForCustomer = async (req, res, next) => {
  try {
    const { contestId } = req.params;

    const approvedOffers = await db.Offers.findAll({
      where: {
        contestId,
        moderationStatus: CONSTANTS.OFFER_STATUS_APPROVED,
      },
      attributes: [
        'id',
        'text',
        'fileName',
        'originalFileName',
        'contestId',
        'status',
        'moderationStatus',
      ],
    });

    res.send(approvedOffers);
  } catch (err) {
    next(err);
  }
};

module.exports.updateOfferStatusByCustomer = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const { OFFER_STATUS_APPROVED, OFFER_STATUS_REJECTED } = CONSTANTS;

  try {
    const offer = await db.Offers.findByPk(id);

    if (!offer) {
      return next(new NotFound('Offer not found'));
    }

    if (offer.moderationStatus !== OFFER_STATUS_APPROVED) {
      return next(
        new BadRequestError('Offer must be approved by moderator first')
      );
    }

    if (![OFFER_STATUS_APPROVED, OFFER_STATUS_REJECTED].includes(status)) {
      return next(new BadRequestError('Invalid status'));
    }

    await offer.update({ status });

    res.send(offer);
  } catch (err) {
    next(err);
  }
};
