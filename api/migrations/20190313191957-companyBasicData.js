'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('companiesBasicData', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    isConfidential: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    sector: {
      type: Sequelize.STRING(100), ///.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    subSector: {
      type: Sequelize.STRING(100), //.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    legalForm: {
      type: Sequelize.INTEGER(10), //.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    type: {
      type: Sequelize.STRING(20),
      allowNull: true
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
    hideCompany: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deleted: {
      type: Sequelize.INTEGER,
      default: 0,
      allowNull: true,
    },
    watch_list: {
      type: Sequelize.INTEGER,
      default: 0,
      allowNull: true,
    }
  },{
    freezeTableName: true,
    tableName: 'companiesBasicData',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('companiesBasicData')
};
