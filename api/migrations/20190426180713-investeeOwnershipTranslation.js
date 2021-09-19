'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeOwnershipTranslation', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeOwnershipId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    shareholderName: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    ownedShares: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    value: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    percent: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING(7),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeOwnershipTranslation')
};
