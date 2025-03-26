const { Router } = require('express');
const offerController = require('./../controllers/offerController');
const basicMiddlewares = require('./../middlewares/basicMiddlewares');

const offersRouter = Router();

offersRouter.get(
  '/',
  basicMiddlewares.onlyForModerator,
  offerController.getAllOffersForModerator
);

offersRouter.patch(
  '/:id/status',
  basicMiddlewares.onlyForModerator,
  offerController.updateOffersStatus
);

offersRouter.get(
  '/creator',
  basicMiddlewares.onlyForCreative,
  offerController.getCreatorOffers
);
offersRouter.get(
  '/customer',
  basicMiddlewares.onlyForCustomer,
  offerController.getCustomerOffers
);

module.exports = offersRouter;
