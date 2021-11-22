/* jshint indent: 2 */

const { truncate } = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const advisorManagementTranslation = sequelize.define('advisorManagementTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    advisorManagementId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    position: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    representativeFor: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
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
  }, { tableName: 'advisorManagementTranslation', paranoid: true });

  return advisorManagementTranslation;
};
