/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investmentTypes = sequelize.define('investmentTypes', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
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
  }, { tableName: 'investmentTypes', paranoid: true });

  investmentTypes.associate = function (models) {
    investmentTypes.hasOne(models.investmentTypesTranslation, { as: 'investmentTypesTranslation', foreignKey: 'investmentTypeId' });
  };

  return investmentTypes;
};
