'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeTranslation', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    institutional_investor_type:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    institutional_investor_type_ar:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    languageId: {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    phoneNumbers: {
      type: Sequelize.STRING(20),
      allowNull: false
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
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeTranslation')
};
