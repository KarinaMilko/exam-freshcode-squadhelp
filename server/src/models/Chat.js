module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chats',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      catalogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conversationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  Chat.associate = function (models) {
    Chat.belongsTo(models.Catalogs, {
      foreignKey: 'catalogId',
    });
    Chat.belongsTo(models.Conversations, {
      foreignKey: 'conversationId',
    });
  };
  return Chat;
};
