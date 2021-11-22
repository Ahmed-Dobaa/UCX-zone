'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const advisorTargetedCountries = sequelize.define('advisorTargetedCountries', {
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
      countryId: {
        type: DataTypes.INTEGER(100),
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
    tableName: 'advisorTargetedCountries',
    paranoid: true,
  });

  return advisorTargetedCountries;
};
