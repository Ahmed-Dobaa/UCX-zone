'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investee', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      unique: true
    },
    code: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    website: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    createdBy: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    verifiedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investee')
};
