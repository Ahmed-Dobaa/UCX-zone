'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investor', {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.ENUM('C', 'I'),
      allowNull: false,
    },
    companyId: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    createdBy: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    turnoverRangeId: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
    },
    follow: {
      type: Sequelize.STRING(1000), //JSON,
      allowNull: true,
    },
    verifiedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investor')
};
