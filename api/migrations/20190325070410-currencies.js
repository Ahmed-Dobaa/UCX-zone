'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('currencies',{
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false ,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW //Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('currencies')
};
