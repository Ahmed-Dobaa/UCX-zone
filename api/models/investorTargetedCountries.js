'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const investor = sequelize.define('investorTargetedCountries', {
    id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      investorId: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true
      },
      sectorId: {
        type: DataTypes.STRING(100),
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
    tableName: 'investorTargetedCountries',
    paranoid: true,
  });

  return investor;
};
