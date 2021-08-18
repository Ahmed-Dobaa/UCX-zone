/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const investeeBoardOfDirectors = sequelize.define('investeeBoardOfDirectors', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
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
  }, { tableName: 'investeeBoardOfDirectors', paranoid: true });

  investeeBoardOfDirectors.associate = function (models) {
    investeeBoardOfDirectors.hasOne(models.investeeBoardOfDirectorTranslation, { as: 'boardOfDirectorTranslation', foreignKey: 'investeeBoardOfDirectorsId' });
  };

  return investeeBoardOfDirectors;
};
