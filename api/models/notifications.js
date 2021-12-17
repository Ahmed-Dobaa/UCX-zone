'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const notifications = sequelize.define('notifications', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    from_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    to_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    reference_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      default: Date.now()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    tableName: 'notifications',
    paranoid: true
  });


  return notifications;
};
