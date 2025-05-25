module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversations',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      blackListCreator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      blackListCustomer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      favoriteCreator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      favoriteCustomer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['creatorId', 'customerId'],
        },
      ],
    }
  );
  Conversation.associate = function (models) {
    Conversation.hasMany(models.Messages, {
      foreignKey: 'conversationId',
    });

    Conversation.belongsToMany(models.Catalogs, {
      through: models.Chats,
      foreignKey: 'conversationId',
    });
    Conversation.belongsTo(models.Users, {
      foreignKey: 'creatorId',
      as: 'creator',
    });

    Conversation.belongsTo(models.Users, {
      foreignKey: 'customerId',
      as: 'customer',
    });
  };

  return Conversation;
};
