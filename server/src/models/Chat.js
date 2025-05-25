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
        references: {
          model: 'Catalogs',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      conversationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Conversations',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
    },
    {
      timestamps: true,
    }
  );

  Chat.associate = function (models) {
    Chat.belongsTo(models.Catalogs, {
      foreignKey: 'catalogId',
      as: 'catalog',
    });
    Chat.belongsTo(models.Conversations, {
      foreignKey: 'conversationId',
      as: 'conversation',
    });
  };

  return Chat;
};
