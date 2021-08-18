/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investeeOwnership = sequelize.define('investeeOwnerships', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ownershipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    investeeId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    accountId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'investeeOwnerships', paranoid: true });

  return investeeOwnership;
};
