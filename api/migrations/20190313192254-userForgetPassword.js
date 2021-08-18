'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userForgetPassword', {
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
    forgetToken: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true
    },
    revoked: {
      type: Sequelize.ENUM('0', '1'),
      allowNull: false,
      default: '0'
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      default: null
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('userForgetPassword')
};
