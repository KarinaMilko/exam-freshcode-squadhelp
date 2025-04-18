module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Messages',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sender: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
  Message.associate = function (models) {
    Message.belongsTo(models.Users, {
      foreignKey: 'sender',
    });
    Message.belongsTo(models.Conversations, {
      foreignKey: 'conversationId',
    });
  };
  return Message;
};
