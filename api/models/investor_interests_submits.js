/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investor_interests_submits = sequelize.define('investor_interests_submits', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    investeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_id:{
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    proposalId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    investment_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    minTicketSize: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    maxTicketSize: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    servicesValue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    significantValue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    clarifications: {
      type: DataTypes.TEXT,
      allowNull: true
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
  }, { tableName: 'investor_interests_submits', paranoid: true });

  return investor_interests_submits;
};
