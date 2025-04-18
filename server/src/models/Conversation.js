module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversations',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      blackListCreative: {
        type: DataTypes.BOOLEAN,
      },
      blackListCustomer: {
        type: DataTypes.BOOLEAN,
      },
      favoriteListCreative: {
        type: DataTypes.BOOLEAN,
      },
      favoriteListCustomer: {
        type: DataTypes.BOOLEAN,
      },
      creativeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  Conversation.associate = function (models) {
    Conversation.belongsTo(models.Users, {
      foreignKey: 'creativeId',
      as: 'creator',
    });
    Conversation.belongsTo(models.Users, {
      foreignKey: 'customerId',
      as: 'customer',
    });
    Conversation.hasMany(models.Messages, {
      foreignKey: 'conversationId',
    });
    Conversation.hasMany(models.Chats, {
      foreignKey: 'conversationId',
    });
  };

  return Conversation;
};
