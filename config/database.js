module.exports = {
  database: 'sql5431252', //'ucxzone_ucxz', //'sql5431252', //
  username: 'sql5431252', //'ucxzone_remote',  //'sql5431252', //
  password: 'JmeY3URIRj', //'wW4Fds9v', //'JmeY3URIRj', //
  host: 'sql5.freemysqlhosting.net', //'localhost', //'sql5.freemysqlhosting.net', //
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
};
