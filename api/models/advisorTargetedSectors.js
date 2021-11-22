'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const advisorTargetedSectors = sequelize.define('advisorTargetedSectors', {
    id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      advisorId: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true
      },
      sectorId: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        default: DataTypes.NOW,
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
    tableName: 'advisorTargetedSectors',
    paranoid: true,
  });

  return advisorTargetedSectors;
};
