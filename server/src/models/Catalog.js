module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define(
    'Catalogs',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      catalogName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
  Catalog.associate = function (models) {
    Catalog.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Catalog.hasMany(models.Chats, {
      foreignKey: 'catalogId',
      as: 'chats',
      onDelete: 'CASCADE',
    });
    Catalog.belongsToMany(models.Conversations, {
      through: models.Chats,
      foreignKey: 'catalogId',
      as: 'conversations',
    });
  };
  return Catalog;
};
