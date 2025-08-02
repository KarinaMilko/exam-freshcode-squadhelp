const { Op } = require('sequelize');
const {
  Conversations,
  Messages,
  Catalogs,
  Chats,
  Users,
} = require('../models');
const controller = require('../socketInit');
const {
  findOrCreateConversation,
  getInterlocutor,
  updateConversationFlag,
} = require('./queries/conversationQueries');

module.exports.addMessage = async (req, res, next) => {
  try {
    const senderId = Number(req.tokenData.userId);
    const recipientId = Number(req.body.recipient);
    const messageBody = req.body.messageBody;

    if (senderId === recipientId) {
      return res.status(400).send({ error: 'Cannot send message to yourself' });
    }

    const conversation = await findOrCreateConversation(senderId, recipientId);

    const message = await Messages.create({
      sender: senderId,
      body: messageBody,
      conversationId: conversation.id,
    });

    const interlocutor = await getInterlocutor(senderId, conversation);

    if (!interlocutor) {
      return res.status(404).send({ error: 'Interlocutor not found' });
    }

    const preview = {
      id: conversation.id,
      sender: senderId,
      text: messageBody,
      createdAt: message.createdAt?.toISOString() || null,
      blackListCreator: conversation.blackListCreator,
      blackListCustomer: conversation.blackListCustomer,
      favoriteCreator: conversation.favoriteCreator,
      favoriteCustomer: conversation.favoriteCustomer,
      creatorId: conversation.creatorId,
      customerId: conversation.customerId,
    };
    const interlocutorId = interlocutor?.id || interlocutor?.dataValues?.id;

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: { ...preview, interlocutor },
    });

    res.send({ message, preview: { ...preview, interlocutor } });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const userId = Number(req.tokenData.userId);

    const conversations = await Conversations.findAll({
      where: {
        [Op.or]: [{ creatorId: userId }, { customerId: userId }],
      },
      include: [
        {
          model: Messages,
          separate: true,
          limit: 1,
          order: [['createdAt', 'DESC']],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });

    const response = await Promise.all(
      conversations.map(async conversation => {
        const {
          id,
          creatorId,
          customerId,
          favoriteCreator,
          favoriteCustomer,
          blackListCreator,
          blackListCustomer,
        } = conversation;

        const lastMessage = conversation.Messages[0] || null;
        const isCreator = creatorId === userId;

        const interlocutor = await getInterlocutor(userId, conversation);

        return {
          id,
          creatorId,
          customerId,
          favoriteCreator,
          favoriteCustomer,
          blackListCreator,
          blackListCustomer,
          sender: lastMessage ? lastMessage.sender : null,
          text: lastMessage ? lastMessage.body : null,
          createdAt: lastMessage?.createdAt
            ? new Date(lastMessage.createdAt).toISOString()
            : null,
          interlocutor,
          isCreator,
        };
      })
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const userId = Number(req.tokenData.userId);
    const interlocutorId = Number(req.params.interlocutorId);

    if (userId === interlocutorId) {
      return res.status(400).send({ error: 'Cannot open chat with yourself' });
    }

    const conversation = await findOrCreateConversation(userId, interlocutorId);

    const messages = await Messages.findAll({
      where: { conversationId: conversation.id },
      order: [['createdAt', 'ASC']],
    });

    const interlocutor = await getInterlocutor(userId, conversation);
    if (!interlocutor) {
      return res.status(404).send({ error: 'Interlocutor not found' });
    }

    res.send({
      messages,
      interlocutor,
      blackListCreator: conversation.blackListCreator,
      blackListCustomer: conversation.blackListCustomer,
      favoriteCreator: conversation.favoriteCreator,
      favoriteCustomer: conversation.favoriteCustomer,
      creatorId: conversation.creatorId,
      customerId: conversation.customerId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const { interlocutorId, favoriteFlag } = req.body;

    if (!userId || !interlocutorId) {
      return res
        .status(400)
        .send({ message: 'Invalid user or interlocutor ID' });
    }

    const updatedConversation = await updateConversationFlag(
      userId,
      interlocutorId,
      'favorite',
      favoriteFlag
    );

    controller
      .getChatController()
      ?.emitChangeBlockStatus(interlocutorId, updatedConversation);

    res.send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const { interlocutorId, blackListFlag } = req.body;

    if (!userId || !interlocutorId) {
      return res
        .status(400)
        .send({ message: 'Invalid user or interlocutor ID' });
    }

    const updatedConversation = await updateConversationFlag(
      userId,
      interlocutorId,
      'blackList',
      blackListFlag
    );

    controller
      .getChatController()
      ?.emitChangeBlockStatus(interlocutorId, updatedConversation);

    res.send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const { catalogName, chatId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogName || !chatId) {
      return res
        .status(400)
        .send({ message: 'Catalog name and chat ID are required.' });
    }

    const catalog = await Catalogs.create({
      userId,
      catalogName,
    });

    await Chats.create({
      catalogId: catalog.id,
      conversationId: chatId,
    });

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { catalogId, catalogName } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId || !catalogName) {
      return res
        .status(400)
        .send({ message: 'Catalog ID and catalog name are required.' });
    }

    const catalog = await Catalogs.findOne({
      where: { id: catalogId, userId },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found.' });
    }

    catalog.catalogName = catalogName;
    await catalog.save();

    const fullCatalog = await Catalogs.findByPk(catalogId, {
      include: [
        {
          model: Chats,
          as: 'chats',
          include: [
            {
              model: Conversations,
              as: 'conversation',
              attributes: [
                'id',
                'creatorId',
                'customerId',
                'blackListCreator',
                'blackListCustomer',
                'favoriteCreator',
                'favoriteCustomer',
              ],
            },
          ],
        },
      ],
    });

    res.send(fullCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId || !chatId) {
      return res
        .status(400)
        .send({ message: 'Catalog ID and chat ID are required.' });
    }

    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found.' });
    }

    const existing = await Chats.findOne({
      where: {
        catalogId,
        conversationId: chatId,
      },
    });

    if (existing) {
      const updatedCatalog = await Catalogs.findByPk(catalogId, {
        include: [
          {
            model: Chats,
            as: 'chats',
            include: [
              {
                model: Conversations,
                as: 'conversation',
              },
            ],
          },
        ],
      });

      return res.status(200).send(updatedCatalog);
    }

    await Chats.create({
      catalogId,
      conversationId: chatId,
    });

    const updatedCatalog = await Catalogs.findByPk(catalogId, {
      include: [
        {
          model: Chats,
          as: 'chats',
          include: [
            {
              model: Conversations,
              as: 'conversation',
            },
          ],
        },
      ],
    });

    res.send(updatedCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId || !chatId) {
      return res
        .status(400)
        .send({ message: 'Catalog ID and chat ID are required.' });
    }

    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found.' });
    }

    const deleted = await Chats.destroy({
      where: {
        catalogId,
        conversationId: chatId,
      },
    });

    if (!deleted) {
      return res.status(404).send({ message: 'Chat not found in catalog.' });
    }

    const updatedCatalog = await Catalogs.findByPk(catalogId, {
      include: [
        {
          model: Chats,
          as: 'chats',
          include: [
            {
              model: Conversations,
              as: 'conversation',
            },
          ],
        },
      ],
    });

    res.send(updatedCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.params;
    const { userId } = req.tokenData;

    if (!catalogId) {
      return res.status(400).send({ message: 'Catalog ID is required.' });
    }
    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found.' });
    }

    await catalog.destroy();

    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    const catalogs = await Catalogs.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Chats,
          as: 'chats',
          attributes: ['id', 'catalogId', 'conversationId'],
          include: [
            {
              model: Conversations,
              as: 'conversation',
              attributes: [
                'id',
                'creatorId',
                'customerId',
                'blackListCreator',
                'blackListCustomer',
                'favoriteCreator',
                'favoriteCustomer',
              ],
              include: [
                {
                  model: Users,
                  as: 'creator',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'displayName',
                    'avatar',
                  ],
                },
                {
                  model: Users,
                  as: 'customer',
                  attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'displayName',
                    'avatar',
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
