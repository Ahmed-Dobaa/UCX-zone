/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const interest_dialog = sequelize.define('interest_dialog', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    interest_id:{
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sender_type:{
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dialog: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'interest_dialog', paranoid: true });

  return interest_dialog;
};
