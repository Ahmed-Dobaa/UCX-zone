/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investeeManagementTranslation = sequelize.define('investeeManagementTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeManagementId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    representativeFor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
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
  }, { tableName: 'investeeManagementTranslation', paranoid: true });

  investeeManagementTranslation.associate = (models) => {

    // investeeManagementTranslation.belongsTo(models.board_of_directors_positions, { as: 'position', foreignKey: 'positionId', targetKey: 'id' });
    // investeeManagementTranslation.belongsTo(models.investee, { as: 'investee', foreignKey: 'investeeId', targetKey: 'id' });
  };

  return investeeManagementTranslation;
};
