'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const Advisor = sequelize.define('Advisor', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    advisor_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    services_scope: {
       type: DataTypes.STRING(50),
       allowNull: true
    },
    servicesList: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    img:{
      type: DataTypes.STRING(100),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    turnoverRangeId: {
      type: DataTypes.INTEGER(100),
      allowNull: true,
    },
    follow: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    verifiedAt: {
      type: DataTypes.DATE,
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
    },
    deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  },
  {
    tableName: 'advisor',
    paranoid: true
  });

  Advisor.associate = function (models) {
    Advisor.belongsTo(models.companiesBasicData, { as: 'company', foreignKey: 'companyId' });
    Advisor.belongsToMany(models.users, { as: 'users', through: 'usersAdvisors', foreignKey: 'advisorId', otherKey: 'userId' });
    Advisor.belongsToMany(models.countries, { as: 'targetedCountries', through: 'advisorTargetedCountries', foreignKey: 'advisorId', otherKey: 'countryId' });
    Advisor.belongsToMany(models.sectors, { as: 'targetedSectors', through: 'advisorTargetedSectors', foreignKey: 'advisorId', otherKey: 'sectorId' });
  };


  return Advisor;
};
