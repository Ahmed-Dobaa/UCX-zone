/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const serviceProviders = sequelize.define('serviceProviders', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
  }, {
    tableName: 'serviceProviders',
    paranoid: true
  });

  serviceProviders.associate = function (models) {
    serviceProviders.hasOne(models.serviceProvidersTranslation, { as: 'serviceProvidersTranslation', foreignKey: 'serviceProviderId' });
    serviceProviders.belongsTo(models.companiesBasicData, { as: 'basicData', foreignKey: 'companyId' });
  };
  return serviceProviders;
};
