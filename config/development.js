module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: '135.181.62.49', //localhost',
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
