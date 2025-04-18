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
      timestamps: false,
    }
  );
  Catalog.associate = function (models) {
    Catalog.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Catalog;
};
