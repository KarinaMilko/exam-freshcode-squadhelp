const { Router } = require('express');
const chatController = require('../controllers/chatController');

const chatRouter = Router();

chatRouter.post('/', chatController.createCatalog);
chatRouter.post('/message', chatController.addMessage);

chatRouter.get('/', chatController.getCatalogs);

chatRouter.patch('/:id', chatController.updateNameCatalog);

chatRouter.delete(
  '/chat/:catalogId/:chatId',
  chatController.removeChatFromCatalog
);
chatRouter.delete('/:id', chatController.deleteCatalog);

module.exports = chatRouter;
