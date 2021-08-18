module.exports = {
  frontEnd: { host: '' },
  connection: {
    host: '0.0.0.0',
    port: process.env.PORT || 80
  },
  joi: {
    allowUnknown: false,
    abortEarly: false
  },
  database: {
    database: '',
    username: '',
    password: '',
    host: '',
    port: 3306,
    dialect: 'mysql',
    debug: true,
    sync: false
  },
  jwt: {
    TokenTtl: '1d',
    stayLoggedInTokenTtl: '30d',
    authKey: 'o12omucSlk7maWgbsAzSuG6eDlrPjpRb'
  },
  mailing: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    from: '',
    subjects: { activationMail: 'Activation Mail ✔' },
    auth: {
      user: '', // generated ethereal user
      pass: '' // generated ethereal password
    }
  },
};
