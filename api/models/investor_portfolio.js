'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const investor_portfolio = sequelize.define('investor_portfolio', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    country_name:{
      type: DataTypes.STRING(100),
      allowNull: true
    },
    headquarter_country: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    sectors: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ownership_percentage: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'investor_portfolio'
  });


  return investor_portfolio;
};
