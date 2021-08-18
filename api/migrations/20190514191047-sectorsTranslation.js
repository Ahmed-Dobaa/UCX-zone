'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sectorsTranslation', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sectorId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
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
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('sectorsTranslation')
};
