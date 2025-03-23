const { Router } = require('express');
const offerController = require('./../controllers/offerController');

const offersRouter = Router();

offersRouter.get('/', offerController.getAllOffersForModerator);

offersRouter.patch('/:id/status', offerController.updateOffersStatus);

offersRouter.get('/creator', offerController.getCreatorOffers);
offersRouter.get('/customer', offerController.getCustomerOffers);

module.exports = offersRouter;
