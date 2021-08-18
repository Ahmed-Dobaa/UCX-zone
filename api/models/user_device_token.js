/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const userDevices = sequelize.define('user_device_token', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    access_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'access_tokenIndex'
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'refresh_tokenIndex'
    },
    device_name: {
      type: DataTypes.JSON,
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
    }
  }, { tableName: 'user_device_token' });

  userDevices.associate = function (models) {
    userDevices.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user'
    });
  };

  return userDevices;
};
