'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('language', [
    { 'name': 'English', 'code': 'en', createdAt: new Date() },
    { 'name': 'Arabic', 'code': 'ar', createdAt: new Date() }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('language', null, {})
};
