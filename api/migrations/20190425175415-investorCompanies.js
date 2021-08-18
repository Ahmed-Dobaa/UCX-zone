'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investorCompanies', {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investorId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: true,
    },
    companyBasicId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      default: Sequelize.NOW,
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

  down: (queryInterface, Sequelize) =>  queryInterface.dropTable('investorCompanies')
};
