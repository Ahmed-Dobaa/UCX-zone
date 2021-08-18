'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_device_token', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    access_token: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: 'access_tokenIndex'
    },
    refresh_token: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: 'refresh_tokenIndex'
    },
    device_name: {
      type: Sequelize.STRING(1000), // JSON,
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
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('user_device_token')
};
// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => queryInterface.createTable('user_device_token', {
//     id: {
//       type: Sequelize.INTEGER(10).UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     code: {
//       type: Sequelize.STRING(5),
//       allowNull: false,
//     },
//     createdAt: {
//       type: Sequelize.DATE,
//       allowNull: true,
//       defaultValue: Sequelize.NOW
//     },
//     updatedAt: {
//       type: Sequelize.DATE,
//       allowNull: true
//     },
//     deletedAt: {
//       type: Sequelize.DATE,
//       allowNull: true,
//     }
//   },{
//     charset: 'utf8',
//     collate: 'utf8_general_ci'
//   }),

//   down: (queryInterface, Sequelize) => queryInterface.dropTable('user_device_token')
// };
