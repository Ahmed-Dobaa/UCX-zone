/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const watchList = sequelize.define('watchList', {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      },
      company_id: {
        type: DataTypes.INTEGER(10),
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
    }, { tableName: 'watch_list', paranoid: true });

    return watchList;
  };
