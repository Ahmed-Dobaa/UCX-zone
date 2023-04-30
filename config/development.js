const fs = require('fs')
const path = require("path");

module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: 'localhost',  //'localhost', //'platform.ucx.zone',  //'localhost', //'localhost', //'platform.ucx.zone',  //'localhost', //'135.181.62.49', //
    port: process.env.PORT || 2053, //8000, // 2053
     tls: {
      key: fs.readFileSync(path.join(__dirname,'./key.pem')),
      cert: fs.readFileSync(path.join(__dirname,'./cert.pem')),
     }
  },
  joi: {
    allowUnknown: true,
    abortEarly: false
  },
  database: {
    database: 'ucxzone_ucxz', //'sql5431252', //'ucxzone_ucxz', //'sql5431252', //'sql5431252', //'ucxzone_ucxz', //'sql5431252', //'sql5431252', //
    username: 'ucxzone_remote',  //'sql5431252', //'ucxzone_remote',  //'sql5431252', //'sql5431252', //'ucxzone_remote', //'sql5431252', //'ucxzone_ucxz',//'sql5431252', //'ucxzone_remote', //'sql5431252', //
    password: 'wW4Fds9v', //'JmeY3URIRj', //'wW4Fds9v', //'JmeY3URIRj', //'JmeY3URIRj', //'wW4Fds9v', //'JmeY3URIRj', //'wW4Fds9v', //'wW4Fds9v', //'JmeY3URIRj', //
    host: 'localhost', //'sql5.freemysqlhosting.net', //'localhost', //'sql5.freemysqlhosting.net', //'sql5.freemysqlhosting.net', //'localhost', //'sql5.freemysqlhosting.net', //'sql5.freemysqlhosting.net', //'localhost', //
    port: 3306,
    dialect: 'mysql',
    debug: true,
    sync: false,
    pool: {
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  jwt: {
    TokenTtl: '1d',
    stayLoggedInTokenTtl: '30d',
    authKey: 'o12omucSlk7maWgbsAzSuG6eDlrPjpRb'
  },
  mailing: {
    host: 'smtp.gmail.com',
    port: 465, // 587
    secure: true, // true for 465, false for other ports
    from: 'UCX Zone',
    subjects: { activationMail: 'Activation Mail' },
    auth: {
      user: 'ucx.zone6@gmail.com', // generated ethereal user
      pass: 'Ahmedmob@UCX6000' // generated ethereal password
    }
  },
};
