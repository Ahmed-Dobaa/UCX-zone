'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {

  const investor = sequelize.define('investor', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM('C', 'I'),
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    turnoverRangeId: {
      type: DataTypes.INTEGER(11),
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
    }
  },
  {
    tableName: 'investor',
    paranoid: true,
    scopes: {
      'includeRelations': function (sequelizeQuery, language = 1) {
        const finalIncludes = [];
        const includes = {
          'investorTranslation': { association: 'investorTranslation', required: false, where: { languageId: language } },
          'companies': { association: 'company' },
          'companies.companiesBasicDataTranslation': {
            association: 'company',
            include: [{ association: 'companiesBasicDataTranslation', where: { languageId: language }, required: false }]
          },
          'targetedCountries': { association: 'targetedCountries', through: { attributes: [] } },
          'targetedCountries.countriesTranslation': {
            association: 'targetedCountries', through: { attributes: [] },
            include: [{ association: 'countriesTranslation', where: { languageId: language }, required: false }]
          },
          'targetedSectors': { association: 'targetedSectors', through: { attributes: [] } },
          'targetedSectors.sectorsTranslation': {
            association: 'targetedSectors', through: { attributes: [] },
            include: [{ association: 'sectorsTranslation', where: { languageId: language }, required: false }]
          },
          'preferredTurnoverRange': { association: 'preferredCompanyTurnoverRange' },
        };
        _.forEach(sequelizeQuery.include, function (rel) {
          if(sequelizeQuery.filters) {
            _.forOwn(sequelizeQuery.filters, function (condition, key) {
              const whereCondition = _.last(key.split('.'));
              const relation = _.take(key.split('.'), key.split('.').length - 1);
              const relationString = _.take(key.split('.'), key.split('.').length - 1).join('.');

              if(_.includes(rel.split('.'), _.last(relationString.split('.')))) {

                if(relation.length === 1) {
                  _.set(includes[rel], 'where.' +whereCondition, condition);
                }

                if(relation.length === 2) {
                  if(whereCondition.indexOf('$') !== -1) {
                    _.set(includes[rel]['include'][0], 'where.',fn('JSON_CONTAINS', col(whereCondition.split('$')[0]), '"'+ condition.toString() +'"', `$.${whereCondition.split('$')[1]}`));
                    delete sequelizeQuery.filters[key];

                    return;
                  }
                  _.set(includes[rel]['include'][0], 'where.' + whereCondition, condition);
                }
                delete sequelizeQuery.filters[key];
              }
            });
          }

          if(! _.isEmpty(includes[rel])) {
            finalIncludes.push(includes[rel]);
          }
        });
        delete sequelizeQuery.filters;

        sequelizeQuery.include = finalIncludes;
        console.log('sequelizeQuery', JSON.stringify(sequelizeQuery));

        return sequelizeQuery;
      }
    }
  });

  investor.associate = function (models) {
    investor.hasOne(models.investorTranslation, { as: 'investorTranslation', foreignKey: 'investorId' });
    investor.belongsTo(models.companiesBasicData, { as: 'company', foreignKey: 'companyId' });
    investor.belongsToMany(models.users, { as: 'users', through: 'usersInvestors', foreignKey: 'investorId', otherKey: 'userId' });
    investor.belongsToMany(models.countries, { as: 'targetedCountries', through: 'investorTargetedCountries', foreignKey: 'investorId', otherKey: 'countryId' });
    investor.belongsToMany(models.sectors, { as: 'targetedSectors', through: 'investorTargetedSectors', foreignKey: 'investorId', otherKey: 'sectorId' });
    investor.belongsToMany(models.investee, { as: 'submittedInterests', through: 'investor_interests_submits', foreignKey: 'investorId', otherKey: 'investeeId' });
    investor.belongsTo(models.companyTurnoverRanges, { as: 'preferredCompanyTurnoverRange', foreignKey: 'turnoverRangeId' });
  };

  return investor;
};
