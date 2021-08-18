/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userForgetPassword', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true
    },
    forgetToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    revoked: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
      default: '0'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      default: null
    }
  }, { tableName: 'userForgetPassword' });
};