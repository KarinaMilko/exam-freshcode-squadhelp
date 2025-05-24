const { Op } = require('sequelize');
const {
  Conversations,
  Messages,
  Catalogs,
  Chats,
  Users,
} = require('../models');
const controller = require('../socketInit');

async function findOrCreateConversation(userId, interlocutorId) {
  // Сортуємо ID, щоб стабільно мати creatorId < customerId
  const [creatorId, customerId] =
    userId < interlocutorId
      ? [userId, interlocutorId]
      : [interlocutorId, userId];

  let conversation = await Conversations.findOne({
    where: { creatorId, customerId },
  });

  if (!conversation) {
    conversation = await Conversations.create({
      creatorId,
      customerId,
      blackListCreator: false,
      blackListCustomer: false,
      favoriteCreator: false,
      favoriteCustomer: false,
    });
  }

  return conversation;
}

module.exports.addMessage = async (req, res, next) => {
  const senderId = Number(req.tokenData.userId);
  const recipientId = Number(req.body.recipient);
  const messageBody = req.body.messageBody;

  if (senderId === recipientId) {
    return res.status(400).send({ error: 'Cannot send message to yourself' });
  }

  // Сортуємо, щоб гарантувати унікальність пари
  const [creatorId, customerId] =
    senderId < recipientId ? [senderId, recipientId] : [recipientId, senderId];

  try {
    let conversation = await Conversations.findOne({
      where: { creatorId, customerId },
    });

    if (!conversation) {
      conversation = await Conversations.create({
        creatorId,
        customerId,
        blackListCreator: false,
        blackListCustomer: false,
        favoriteCreator: false,
        favoriteCustomer: false,
      });
    }

    const message = await Messages.create({
      sender: senderId,
      body: messageBody,
      conversationId: conversation.id,
    });

    const interlocutorId =
      senderId === conversation.creatorId
        ? conversation.customerId
        : conversation.creatorId;

    const interlocutor = await Users.findByPk(interlocutorId, {
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

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
  const userId = Number(req.tokenData.userId);

  try {
    // Отримуємо всі розмови, де користувач є creator або customer
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

    // Формуємо відповідь асинхронно
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

        // Співрозмовник — це той, хто не є користувачем
        const interlocutorId = isCreator ? customerId : creatorId;

        // Отримуємо дані співрозмовника
        const interlocutor = await Users.findByPk(interlocutorId, {
          attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
        });

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
  const userId = Number(req.tokenData.userId);
  const interlocutorId = Number(req.params.interlocutorId);

  if (userId === interlocutorId) {
    return res.status(400).send({ error: 'Cannot open chat with yourself' });
  }

  // Нормалізуємо порядок ID, щоб відповідало унікальному ключу
  const [creatorId, customerId] =
    userId < interlocutorId
      ? [userId, interlocutorId]
      : [interlocutorId, userId];

  try {
    // Знаходимо розмову за нормалізованою парою
    const conversation = await Conversations.findOne({
      where: { creatorId, customerId },
    });

    if (!conversation) {
      conversation = await Conversations.create({
        creatorId,
        customerId,
        favoriteCreator: false,
        favoriteCustomer: false,
        blackListCreator: false,
        blackListCustomer: false,
      });
    }

    // Вивантажуємо всі повідомлення з розмови
    const messages = await Messages.findAll({
      where: { conversationId: conversation.id },
      order: [['createdAt', 'ASC']],
    });

    // Визначаємо співрозмовника (той, хто не є userId)
    const interlocutorUserId =
      userId === conversation.creatorId
        ? conversation.customerId
        : conversation.creatorId;

    // Знаходимо користувача співрозмовника
    const interlocutor = await Users.findByPk(interlocutorUserId, {
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

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
  const { userId } = req.tokenData;
  const { interlocutorId, favoriteFlag } = req.body;

  if (!userId || !interlocutorId) {
    return res.status(400).send({ message: 'Invalid user or interlocutor ID' });
  }

  try {
    const conversation = await findOrCreateConversation(userId, interlocutorId);

    const isCreator = conversation.creatorId === userId;

    await conversation.update({
      [isCreator ? 'favoriteCreator' : 'favoriteCustomer']: favoriteFlag,
    });

    const updatedConversation = conversation.toJSON();

    controller
      .getChatController()
      ?.emitChangeBlockStatus(interlocutorId, updatedConversation);

    res.send(updatedConversation);
  } catch (err) {
    next(err);
  }
};
module.exports.blackList = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { interlocutorId, blackListFlag } = req.body;

  if (!userId || !interlocutorId) {
    return res.status(400).send({ message: 'Invalid user or interlocutor ID' });
  }

  try {
    const conversation = await findOrCreateConversation(userId, interlocutorId);

    const isCreator = conversation.creatorId === userId;

    await conversation.update({
      [isCreator ? 'blackListCreator' : 'blackListCustomer']: blackListFlag,
    });

    const updatedConversation = conversation.toJSON();

    controller
      .getChatController()
      ?.emitChangeBlockStatus(interlocutorId, updatedConversation);

    res.send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const { catalogName, chatId } = req.body;
  const { userId } = req.tokenData;

  if (!catalogName || !chatId) {
    return res
      .status(400)
      .send({ message: 'Catalog name and chat ID are required.' });
  }

  try {
    const catalog = await Catalogs.create({
      userId,
      catalogName,
    });

    // Додаємо зв'язок в таблицю Chats (як проміжну)
    await Chats.create({
      catalogId: catalog.id,
      conversationId: chatId, // тут chatId — це conversationId!
    });

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  const { catalogId, catalogName } = req.body;
  const { userId } = req.tokenData;

  if (!catalogId || !catalogName) {
    return res
      .status(400)
      .send({ message: 'Catalog ID and catalog name are required.' });
  }

  try {
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
  const { catalogId, chatId } = req.body;
  const { userId } = req.tokenData;

  if (!catalogId || !chatId) {
    return res
      .status(400)
      .send({ message: 'Catalog ID and chat ID are required.' });
  }

  try {
    // Перевіряємо, чи існує каталог
    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found.' });
    }

    // Перевіряємо, чи зв’язок вже існує
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

      return res.status(200).send(updatedCatalog); // ⬅️ повертаємо все як успішну відповідь
    }

    // Створюємо зв’язок
    await Chats.create({
      catalogId,
      conversationId: chatId,
    });

    // Повертаємо оновлений каталог
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
  const { catalogId, chatId } = req.body;
  const { userId } = req.tokenData;

  if (!catalogId || !chatId) {
    return res
      .status(400)
      .send({ message: 'Catalog ID and chat ID are required.' });
  }

  try {
    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found.' });
    }

    // Видаляємо чат із каталогу
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

    // res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const { catalogId } = req.params;
  const { userId } = req.tokenData;

  if (!catalogId) {
    return res.status(400).send({ message: 'Catalog ID is required.' });
  }

  try {
    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found.' });
    }

    await catalog.destroy(); // Завдяки CASCADE Chats автоматично видаляться

    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  const { userId } = req.tokenData;

  try {
    const catalogs = await Catalogs.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Chats, // Використовуємо асоціацію між Catalog і Chat
          as: 'chats',
          attributes: ['id', 'catalogId', 'conversationId'], // Тут визначаємо, які атрибути чатів нам потрібні
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
