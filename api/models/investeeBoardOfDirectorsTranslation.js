/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const investeeBoardOfDirectors = sequelize.define('investeeBoardOfDirectorTranslation', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeBoardOfDirectorsId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
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
  }, { tableName: 'investeeBoardOfDirectorTranslation', paranoid: true });

  return investeeBoardOfDirectors;
};
