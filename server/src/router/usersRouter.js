const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const upload = require('../utils/fileUpload');

const usersRouter = Router();

usersRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

usersRouter.post('/login', validators.validateLogin, userController.login);

usersRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

usersRouter.get('/', checkToken.checkAuth, userController.getUser);

usersRouter.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

module.exports = usersRouter;
