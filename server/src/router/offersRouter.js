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

module.exports = offersRouter;
