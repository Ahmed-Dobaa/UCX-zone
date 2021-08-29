'use strict';

const sequelize = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    companyName: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    position_in_company: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    target_country: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    target_sectors: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    nationality: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    annual_sales: {
       type: Sequelize.INTEGER(11),
       allowNull: true
    },
    estimated_company_value: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    required_investment_amount: {
      type: Sequelize.INTEGER(11),
      allowNull: true
     },
     description: {
      type: Sequelize.STRING(1000),
      allowNull: true
     },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true
    },
    emailVerifiedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    badgeId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    avatar: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true
    },
    country: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    phoneNumber: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    locationInfo: {
      type: Sequelize.STRING(1000), // JSON,
      allowNull: true,
      default: null
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    gender: {
      type: Sequelize.ENUM('M','F'),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    active: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    secret: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    interests: {
      type: Sequelize.STRING(1000), //JSON,
      allowNull: false,
      // defaultValue: []
    },
    activationToken: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    generalRole: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    twoFactorAuthentication: {
      type: Sequelize.ENUM('0', '1'),
      allowNull: true,
      default: '0'
    },
    twoFactorAuthenticationCode: {
      type: Sequelize.INTEGER(6),
      allowNull: true,
      unique: true
    },
    accessGroup: {
      type: Sequelize.STRING(1000), //JSON,
      allowNull: true,
      // defaultValue: []
    },
    subscription: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
    },
    website_of_company: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    minimum_investment_amount: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    maximun_investment_amount: {
      type: Sequelize.INTEGER(11),
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
      allowNull: true
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
