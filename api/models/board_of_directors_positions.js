/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const boardOfDirectorsPositions = sequelize.define('board_of_directors_positions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
  }, { tableName: 'board_of_directors_positions', paranoid: true });

  return boardOfDirectorsPositions;
};
