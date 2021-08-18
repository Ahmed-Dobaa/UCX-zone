'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_social_media', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      unique: true
    },
    facebook: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    twitter: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    instagram: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    linkedIn: {
      type: Sequelize.STRING(255),
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('user_social_media')
};
