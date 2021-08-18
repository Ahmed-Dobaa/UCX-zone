module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: 'localhost',
    port: process.env.PORT || 12225,
    tls: null
  },
  joi: {
    allowUnknown: true,
    abortEarly: false
  },
  database: {
    database: 'sql5431252', //'',
    username: 'sql5431252', //'root',
    password: 'JmeY3URIRj', //'12345',
    host: 'sql5.freemysqlhosting.net', //'127.0.0.1',
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
    host: '',
    port: 465,
    secure: true, // true for 465, false for other ports
    from: '',
    subjects: { activationMail: 'Activation Mail' },
    auth: {
      user: '', // generated ethereal user
      pass: '' // generated ethereal password
    }
  },
};
