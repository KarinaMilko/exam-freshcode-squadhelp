const { Op } = require('sequelize');
const bd = require('../models');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  Object.assign(object.where, {
    status: {
      [bd.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes(index) {
  return { [bd.Sequelize.Op.or]: [types[index].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

module.exports.getOfferWhereByRole = (role, userId) => {
  const {
    MODERATOR,
    CUSTOMER,
    CREATOR,
    OFFER_STATUS_APPROVED,
    OFFER_STATUS_WON,
    OFFER_STATUS_PENDING,
  } = CONSTANTS;

  if (role === MODERATOR) return {};
  if (role === CUSTOMER) {
    return {
      moderationStatus: OFFER_STATUS_APPROVED,
      status: {
        [Op.in]: [
          OFFER_STATUS_APPROVED,
          OFFER_STATUS_WON,
          OFFER_STATUS_PENDING,
        ],
      },
    };
  }
  if (role === CREATOR)
    return {
      userId,
    };
  return {};
};
