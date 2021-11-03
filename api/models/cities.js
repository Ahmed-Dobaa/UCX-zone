/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const cities = sequelize.define('cities', {
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
        allowNull: true
      },
       country_translation_id: {
        type: DataTypes.INTEGER(15),
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
    }, { tableName: 'cities', paranoid: true });

    return cities;
  };
