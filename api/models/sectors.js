'use strict';

module.exports = function (sequelize, DataTypes) {
  const sectors = sequelize.define('sectors', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
  },
    {
      tableName: 'sectors',
      paranoid: true
    });

  sectors.associate = function (models) {
    sectors.hasOne(models.sectorsTranslation, { as: 'sectorsTranslation', foreignKey: 'sectorId' });
    sectors.belongsToMany(models.investor, { as: 'targetedSectors', through: 'investorTargetedSectors', foreignKey: 'investorId', otherKey: 'sectorId' });
  };

  return sectors;
};
