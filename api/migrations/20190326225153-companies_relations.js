'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('companies_relations', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    parentId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    childId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    sharePercentage: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    haveManagementRight: {
      type: Sequelize.INTEGER(5), //ENUM('0', '1'),
      allowNull: true,
      default: 0,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('companies_relations')
};
