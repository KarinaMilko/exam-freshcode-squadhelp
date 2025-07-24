const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');

const contestsRouter = Router();

contestsRouter.post(
  '/customer',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

contestsRouter.post(
  '/creative',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

contestsRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestsRouter.get('/customer', contestController.getCustomersContests);

contestsRouter.get(
  '/:id',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

contestsRouter.patch(
  '/:id',
  upload.updateContestFile,
  contestController.updateContest
);

contestsRouter.post('/dataForContest', contestController.dataForContest);

contestsRouter.get('/downloadFile/:fileName', contestController.downloadFile);

contestsRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

contestsRouter.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

module.exports = contestsRouter;
