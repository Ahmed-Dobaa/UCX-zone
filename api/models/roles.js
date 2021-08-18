'use strict';

module.exports = function (sequelize, DataTypes) {
  const roles = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    // category: {
    //   type: DataTypes.STRING(45),
    //   allowNull: false
    // },
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
      allowNull: true
    }
  }, { tableName: 'roles', paranoid: true });

  roles.associate = function (models) {
    roles.hasMany(models.users, { as: 'users', foreignKey: 'generalRole', sourceKey: 'id' });
    roles.belongsToMany(models.permissions, { as: 'permissions', through: 'rolesPermissions', foreignKey: 'roleId', otherKey: 'permissionId' });
  };

  return roles;
};
