/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('investor_attachments', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    attachment_path: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    attachment_type: {
      type: DataTypes.STRING(50),
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
  }, { tableName: 'investor_attachments' });
};
