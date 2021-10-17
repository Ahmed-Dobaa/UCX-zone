'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const investor = sequelize.define('investorTargetedSectors', {
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
      countryId: {
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
    tableName: 'investorTargetedSectors',
    paranoid: true,
  });

  return investor;
};
