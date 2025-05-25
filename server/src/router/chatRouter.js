const { Router } = require('express');
const chatController = require('../controllers/chatController');

const chatRouter = Router();

chatRouter.post('/addMessage', chatController.addMessage);
chatRouter.post('/createCatalog', chatController.createCatalog);

chatRouter.get('/getChat/:interlocutorId', chatController.getChat);
chatRouter.get('/getPreview', chatController.getPreview);
chatRouter.get('/getCatalogs', chatController.getCatalogs);

chatRouter.patch('/blackList', chatController.blackList);
chatRouter.patch('/favoriteChat', chatController.favoriteChat);
chatRouter.patch('/addNewChatToCatalog', chatController.addNewChatToCatalog);
chatRouter.patch(
  '/removeChatFromCatalog',
  chatController.removeChatFromCatalog
);
chatRouter.patch('/updateNameCatalog', chatController.updateNameCatalog);

chatRouter.delete('/deleteCatalog/:catalogId', chatController.deleteCatalog);

module.exports = chatRouter;
