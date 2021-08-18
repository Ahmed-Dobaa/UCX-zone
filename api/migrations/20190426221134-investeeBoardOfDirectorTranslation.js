'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeBoardOfDirectorTranslation', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeBoardOfDirectorsId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    position: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING(20),
      allowNull: false
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeBoardOfDirectorTranslation')
};
