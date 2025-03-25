const { Router } = require('express');
const offerController = require('./../controllers/offerController');
const basicMiddlewares = require('./../middlewares/basicMiddlewares');

const offersRouter = Router();

offersRouter.get(
  '/',
  basicMiddlewares.onlyForModerator,
  offerController.getAllOffersForModerator
);

offersRouter.patch('/:id/status', offerController.updateOffersStatus);

offersRouter.get('/creator', offerController.getCreatorOffers);
offersRouter.get('/customer', offerController.getCustomerOffers);

module.exports = offersRouter;
