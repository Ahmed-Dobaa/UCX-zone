'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('countriesTranslation', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    countryId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    country_type: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    flag: {
      type: Sequelize.STRING(5),
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
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
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('countriesTranslation')
};
