/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const ownership = sequelize.define('ownerships', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('M','F'),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'ownerships', paranoid: true });

  ownership.associate = (models) => {
    ownership.belongsToMany(models.investee, { as: 'investees', through: 'investeeOwnerships', foreignKey: 'ownershipId', otherKey: 'investeeId' });
    ownership.hasOne(models.investeeOwnershipTranslation, { as: 'ownershipTranslation', foreignKey: 'investeeOwnershipId' });
  };

  return ownership;
};
