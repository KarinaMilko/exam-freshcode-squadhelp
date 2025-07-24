const express = require('express');
const checkToken = require('../middlewares/checkToken');
const contestsRouter = require('./contestsRouter');
const chatRouter = require('./chatRouter');
const usersRouter = require('./usersRouter');
const offersRouter = require('./offersRouter');

const router = express.Router();

router.use('/users', usersRouter);

router.use(checkToken.checkToken);

router.use('/contests', contestsRouter);

router.use('/offers', offersRouter);

router.use('/chat', chatRouter);

module.exports = router;
