/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const lookup_master = sequelize.define('lookup_master', {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name_en: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      name_ar: {
        type: DataTypes.STRING(255),
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
    }, { tableName: 'lookup_master', paranoid: true });

    return lookup_master;
  };
