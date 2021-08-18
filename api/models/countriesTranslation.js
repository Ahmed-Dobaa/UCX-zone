/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const countriesTranslation = sequelize.define('countriesTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    countryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'countriesTranslation', paranoid: true });

  countriesTranslation.associate = function (models) {
    countriesTranslation.belongsTo(models.countries, { as: 'country', foreignKey: 'countryId' });
  };

  return countriesTranslation;
};
