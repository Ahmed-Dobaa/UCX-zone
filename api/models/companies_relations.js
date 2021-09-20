'use strict';

module.exports = function (sequelize, DataTypes) {
  const subsidaries = sequelize.define('companies_relations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    childId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    sharePercentage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    haveManagementRight: {
      type: DataTypes.INTEGER(5), //ENUM('0', '1'),
      allowNull: true,
      default: 0,
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
  }, { tableName: 'companies_relations', paranoid: true });

  subsidaries.associate = function (models) {
    subsidaries.belongsTo(models.companiesBasicData, { as: 'basicData', foreignKey: 'childId', sourceKey: 'id' });
  };

  return subsidaries;
};
