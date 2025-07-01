const { Router } = require('express');
const offerController = require('./../controllers/offerController');
const basicMiddlewares = require('./../middlewares/basicMiddlewares');

const offersRouter = Router();

offersRouter.get(
  '/moderator',
  basicMiddlewares.onlyForModerator,
  offerController.getAllOffersForModerator
);

offersRouter.patch(
  '/moderator/:id/status',
  basicMiddlewares.onlyForModerator,
  offerController.updateOffersStatus
);

offersRouter.get(
  '/customer/:contestId',
  basicMiddlewares.onlyForCustomer,
  offerController.getApprovedOffersForCustomer
);

offersRouter.patch(
  '/customer/:id/status',
  basicMiddlewares.onlyForCustomer,
  offerController.updateOfferStatusByCustomer
);

module.exports = offersRouter;
