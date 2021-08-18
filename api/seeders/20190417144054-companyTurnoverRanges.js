'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('companyTurnoverRanges', [
    { 'id': 1, 'max': 1000000, createdAt: new Date() },
    { 'id': 2, 'min': 1000000, 'max': 5000000, createdAt: new Date() },
    { 'id': 3, 'min': 5000000, 'max': 10000000, createdAt: new Date() },
    { 'id': 4, 'min': 10000000, 'max': 25000000, createdAt: new Date() },
    { 'id': 5, 'min': 25000000, 'max': 100000000, createdAt: new Date() },
    { 'id': 6, 'min': 100000000, 'max': 500000000, createdAt: new Date() },
    { 'id': 7, 'min': 500000000, createdAt: new Date() },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('companyTurnoverRanges', null, {})
};
