const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const contestsRouter = require('./contestsRouter');
const chatRouter = require('./chatRouter');
const usersRouter = require('./usersRouter');
const offersRouter = require('./offersRouter');

const router = express.Router();

router.use('/users', usersRouter);

router.use(checkToken.checkToken);

router.use('/contests', contestsRouter);

router.use('/offers', offersRouter);

router.post('/dataForContest', contestController.dataForContest);

router.get('/downloadFile/:fileName', contestController.downloadFile);

router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.use('/chat', chatRouter);

module.exports = router;
