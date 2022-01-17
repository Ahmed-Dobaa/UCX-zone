/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const subsectors = sequelize.define('subsectors', {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subsector_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      language_id: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
       sectorTranslation_id: {
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
    }, { tableName: 'subsectors', paranoid: true });

    return subsectors;
  };
