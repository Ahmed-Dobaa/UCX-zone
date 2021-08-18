module.exports = function (sequelize, DataTypes) {
  const countries = sequelize.define('countries', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'countries', paranoid: true });

  countries.associate = function (models) {
    countries.hasOne(models.countriesTranslation, { as: 'countriesTranslation', foreignKey: 'countryId' });
    countries.belongsToMany(models.investor, { as: 'targetedCountries', through: 'investorTargetedCountries', foreignKey: 'investorId', otherKey: 'countryId' });
  };

  return countries;
};
