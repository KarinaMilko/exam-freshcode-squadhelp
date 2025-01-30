const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const userController = require('../controllers/userController');

const usersRouter = Router();

usersRouter.get('/', checkToken.checkAuth, userController.getUser);

module.exports = usersRouter;
