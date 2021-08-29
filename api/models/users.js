'use strict';

const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: 'email_unique',
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    badgeId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    locationInfo: {
      type: DataTypes.JSON,
      allowNull: true,
      default: null,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('M','F'),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    secret: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    interests: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    activationToken: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    generalRole: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    twoFactorAuthentication: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: true,
      default: '0'
    },
    twoFactorAuthenticationCode: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      unique: true
    },
    accessGroup: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    subscription: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    website_of_company: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    minimum_investment_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    maximun_investment_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    position_in_company: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    target_country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    target_sectors: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    annual_sales: {
      type: DataTypes.INTEGER(11),
      allowNull: true
   },
   estimated_company_value: {
    type: DataTypes.INTEGER(11),
    allowNull: true
   },
   required_investment_amount: {
    type: DataTypes.INTEGER(11),
    allowNull: true
   },
   description: {
    type: DataTypes.STRING(1000),
    allowNull: true
   },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'users', paranoid: true });

  users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  users.addHook('beforeCreate', (user, option) => {
    if(user.password) {
      return user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    }
  });

  users.addHook('beforeUpdate', (user) => {
    if(user.password) {
      return user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  users.addHook('beforeBulkUpdate', (user) => {
    if(user.password) {
      return user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  users.associate = function (models) {
    users.belongsTo(models.roles, { as: 'role', foreignKey: 'generalRole', targetKey: 'id' });
    users.belongsToMany(models.investee, { as: 'investees', through: 'usersInvestees', foreignKey: 'investeeId', otherKey: 'userId' });
    users.hasOne(models.user_social_media, { as: 'socialMedia', foreignKey: 'userId' });
    users.hasMany(models.user_device_token, { foreignKey: 'userId', sourceKey: 'id', as: 'loggedInDevices' });
  };

  return users;
};
