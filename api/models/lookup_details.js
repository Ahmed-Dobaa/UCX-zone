/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const lookup_details = sequelize.define('lookup_details', {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      lookup_detail_name_en: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      lookup_detail_name_ar: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
       lookup_master_id: {
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
    }, { tableName: 'lookup_details', paranoid: true });

    return lookup_details;
  };
