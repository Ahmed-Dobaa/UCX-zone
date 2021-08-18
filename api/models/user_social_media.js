/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const userSocialMedia = sequelize.define('user_social_media', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    linkedIn: {
      type: DataTypes.STRING(255),
      allowNull: true
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
  }, { tableName: 'user_social_media', paranoid: true });

  userSocialMedia.associate = function (models) {
    userSocialMedia.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
  };


  return userSocialMedia;
};