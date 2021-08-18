/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investeeServiceRequest = sequelize.define('investeeServiceRequest', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    serviceName: {
      type: DataTypes.STRING(100),
      allowNull: false
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
  }, { tableName: 'investeeServiceRequest', paranoid: true });

  investeeServiceRequest.associate = function (models) {
    investeeServiceRequest.belongsTo(models.investee, { as: 'investee', foreignKey: 'investeeId' });
  };

  return investeeServiceRequest;
};
