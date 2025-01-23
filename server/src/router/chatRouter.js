const { Router } = require('express');
const chatController = require('../controllers/chatController');

const chatRouter = Router();

chatRouter.post('/message', chatController.addMessage);

chatRouter.delete('/:id', chatController.deleteCatalog);

module.exports = chatRouter;
