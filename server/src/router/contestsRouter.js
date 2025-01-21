const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');

const contestsRouter = Router();

contestsRouter.post(
  '/',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

contestsRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestsRouter.get('/byCustomer', contestController.getCustomersContests);

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

module.exports = contestsRouter;
