const fs = require('fs');

module.exports = {
  frontEnd: { host: '' },
  connection: {
    host: 'ucxzoni.herokuapp.com',
    // port: 80, //process.env.PORT,
    protocol: 'https:'  //|| 80
    // tls: {
    //   key: '',
    //   cert: '',
    // }
  },
  joi: {
    allowUnknown: false,
    abortEarly: false
  },
  database: {
    database: 'sql5431252', //'',
    username: 'sql5431252', //'root',
    password: 'JmeY3URIRj',
    host: 'sql5.freemysqlhosting.net',
    port: 3306,
    dialect: 'mysql',
    debug: false,
    sync: false
  },
  jwt: {
    TokenTtl: '1d',
    stayLoggedInTokenTtl: '30d',
    authKey: 'o12omucSlk7maWgbsAzSuG6eDlrPjpRb'
  },
  mailing: {
    host: 'mail.ucx.zone',
    port: 465,
    secure: true, // true for 465, false for other ports
    from: '',
    subjects: { activationMail: 'Activation Mail' },
    auth: {
      user: '', // generated ethereal user
      pass: ')' // generated ethereal password
    }
  },
};
