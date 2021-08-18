'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('roles', [
    { id: '1', 'name': 'System Admin', 'description': '', createdAt: new Date() },
    { id: '2', 'name': 'Investee Main Admin', 'description': '', createdAt: new Date() },
    { id: '3', 'name': 'Investee Directors', 'description': '', createdAt: new Date() },
    { id: '4', 'name': 'Investee Shareholders', 'description': '', createdAt: new Date() },
    { id: '5', 'name': 'Investee Managements', 'description': '', createdAt: new Date() },
    { id: '6', 'name': 'Investee Employees', 'description': '', createdAt: new Date() },
    { id: '7', 'name': 'Investee Auditor', 'description': '', createdAt: new Date() },
    { id: '8', 'name': 'Investor Main Admin', 'description': '', createdAt: new Date() },
    { id: '9', 'name': 'Investor Employees', 'description': '', createdAt: new Date() },
    { id: '10', 'name': 'Advisor Main Admin', 'description': '', createdAt: new Date() },
    { id: '11', 'name': 'Advisor Employees', 'description': '', createdAt: new Date() },
    { id: '12', 'name': 'Registered User', 'description': '', createdAt: new Date() },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('roles', null, {})
};
