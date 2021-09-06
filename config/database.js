module.exports = {
  database: 'ucxzone_ucxz',//'sql5431252',
  username: 'ucxzone_remote', //'sql5431252',
  password: 'wW4Fds9v', //'JmeY3URIRj',
  host: 'localhost', //'sql5.freemysqlhosting.net',
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
