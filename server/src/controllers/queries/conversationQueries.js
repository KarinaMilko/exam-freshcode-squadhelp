const { Conversations, Users } = require('./../../models');

async function findOrCreateConversation(userId, interlocutorId) {
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

async function getInterlocutor(userId, conversation) {
  const interlocutorId =
    userId === conversation.creatorId
      ? conversation.customerId
      : conversation.creatorId;

  return Users.findByPk(interlocutorId, {
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
}

async function updateConversationFlag(
  userId,
  interlocutorId,
  flagKey,
  flagValue
) {
  const conversation = await findOrCreateConversation(userId, interlocutorId);
  const isCreator = conversation.creatorId === userId;

  await conversation.update({
    [isCreator ? `${flagKey}Creator` : `${flagKey}Customer`]: flagValue,
  });

  return conversation.toJSON();
}

module.exports = {
  findOrCreateConversation,
  getInterlocutor,
  updateConversationFlag,
};
