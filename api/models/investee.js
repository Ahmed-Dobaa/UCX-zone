/* jshint indent: 2 */
const { fn, col } = require('sequelize');
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const investee = sequelize.define('investee', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true
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
  },
  {
    tableName: 'investee',
    paranoid: true,
    scopes: {
      'includeRelations': function (sequleizeQuery, lanagauge = 1) {
        const finalIncludes = [];
        const includes = {
          'investeeTranslation': { association: 'investeeTranslation', required: true, where: { languageId: lanagauge } },
          'basicData': { association: 'basicData', required: true },
          'basicData.companiesBasicDataTranslation': {
            association: 'basicData',
            required: true,
            include: [
              {
                association: 'companiesBasicDataTranslation',
                required: true,
                where: { languageId: lanagauge }
              }
            ]
          },
          'capital': { association: 'capital',required: false, where: { languageId: lanagauge } },
          'ownerships': { association: 'ownerships', through: { attributes: [] } },
          'ownerships.ownershipTranslation': {
            association: 'ownerships', through: { attributes: [] },
            include: [{ association: 'ownershipTranslation', where: { languageId: lanagauge }, required: false }]
          },
          'managements': { association: 'managements' },
          'managements.managementTranslation': { association: 'managements', include: [{ association: 'managementTranslation', where: { languageId: lanagauge }, required: false }] },
          'boardOfDirectors': { association: 'boardOfDirectors' },
          'boardOfDirectors.boardOfDirectorTranslation': { association: 'boardOfDirectors', include: [{ association: 'boardOfDirectorTranslation', where: { languageId: lanagauge }, required: false }] },
          'auditors': { association: 'auditors' },
          'auditors.auditorTranslation': { association: 'auditors', include: [{ association: 'auditorTranslation', where: { languageId: lanagauge }, required: false }] },
          'incomes': { association: 'incomes' },
          'incomes.incomeTranslation': { association: 'incomes', include: [{ association: 'incomeTranslation', where: { languageId: lanagauge }, required: false }] },
          'balances': { association: 'balances' },
          'balances.balanceTranslation': { association: 'balances', include: [{ association: 'balanceTranslation', where: { languageId: lanagauge }, required: false }] },
          'investmentProposals': { association: 'investmentProposals' },
          'investmentProposals.investeeInvestmentProposalTranslation': { association: 'investmentProposals', include: [{ association: 'investeeInvestmentProposalTranslation', where: { languageId: lanagauge }, required: false }] },
          // 'submittedInterests': { association: 'submittedInterests' },
        };

        _.forEach(sequleizeQuery.include, function (rel) {
          if(sequleizeQuery.filters) {
            _.forOwn(sequleizeQuery.filters, function (condition, key) {
              const whereCondition = _.last(key.split('.'));
              const relation = _.take(key.split('.'), key.split('.').length - 1);
              const relationString = _.take(key.split('.'), key.split('.').length - 1).join('.');

              if(_.includes(rel.split('.'), _.last(relationString.split('.')))) {

                if(relation.length === 1) {
                  _.set(includes[rel], 'where.' +whereCondition, condition);
                }

                if(relation.length === 2) {
                  if(whereCondition.indexOf('$') !== -1) {
                    _.set(includes[rel]['include'][0], 'where.',fn('JSON_CONTAINS', col('basicData->companiesBasicDataTranslation.'+whereCondition.split('$')[0]), '"'+ condition.toString() +'"', `$.${whereCondition.split('$')[1]}`));
                    delete sequleizeQuery.filters[key];

                    return;
                  }
                  _.set(includes[rel]['include'][0], 'where.' + whereCondition, condition);
                }
                delete sequleizeQuery.filters[key];
              }
            });
          }

          if(! _.isEmpty(includes[rel])) {
            finalIncludes.push(includes[rel]);
          }
        });
        delete sequleizeQuery.filters;

        sequleizeQuery.include = finalIncludes;
        console.log('sequleizeQuery', JSON.stringify(sequleizeQuery));

        return sequleizeQuery;
      }
    }
  });

  investee.associate = function (models) {
    investee.belongsToMany(models.users, { as: 'users', through: 'usersInvestees', foreignKey: 'investeeId', otherKey: 'userId' });
    investee.hasOne(models.investeeTranslation, { as: 'investeeTranslation', foreignKey: 'investeeId' });
    investee.belongsTo(models.companiesBasicData, { as: 'basicData', foreignKey: 'companyId' });
    investee.hasOne(models.investeeCapital, { as: 'capital', foreignKey: 'investeeId' });
    investee.belongsToMany(models.ownerships, { as: 'ownerships', through: 'investeeOwnerships', foreignKey: 'investeeId', otherKey: 'ownershipId' });
    investee.hasMany(models.investeeManagement, { as: 'managements', foreignKey: 'investeeId', sourceKey: 'id' });
    investee.hasMany(models.investeeBoardOfDirectors, { as: 'boardOfDirectors', foreignKey: 'investeeId', sourceKey: 'id' });
    investee.hasMany(models.investeeAuditor, { as: 'auditors', foreignKey: 'investeeId', sourceKey: 'id' });
    investee.hasMany(models.investeeIncomes, { as: 'incomes', foreignKey: 'investeeId', sourceKey: 'id' });
    investee.hasMany(models.investeeBalances, { as: 'balances', foreignKey: 'investeeId', sourceKey: 'id' });
    investee.hasMany(models.investeeInvestmentProposals, { as: 'investmentProposals', foreignKey: 'investeeId', sourceKey: 'id' });
    investee.hasMany(models.investeeServiceRequest, { as: 'investeeServiceRequests', foreignKey: 'investeeId', sourceKey: 'id' });

    // investee.belongsToMany(models.investor, { as: 'submittedInterests', through: 'investor_interests_submits', foreignKey: 'investorId', otherKey: 'investeeId' });
  };

  return investee;
};
