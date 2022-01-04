const fs = require('fs')

module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: 'platform.ucx.zone',  //'localhost', //'localhost', //'platform.ucx.zone',  //'localhost', //'135.181.62.49', //
    port: process.env.PORT || 2053, //8000, // 2053


//  test
     tls: {
      key: `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAqMWRbqShlvddBb2kUoUYpQZPiPCZ7jqIY1AnZ0cu6RJHuw2U
NxMZ36NJ/y+mg9Dk/JVT8vo8zVQrVT8NZz5l/9QaGvuyvmWcBFO9IozAKycYhjqF
B7s8w89rxG8McKbgabBCGUl0dd783ReD1wDZroiiJpp3BWzgVesai/YJ4dFF2Kq4
KogzO/5N2iSsor38lf7a4g/OHKDaq49zR0BleWJxURjhKzG7KS/0CWt6qYtLr3pM
pQe3Ic4U/ahYam4qEKyo3hRMfjwGUjp9xDKbIB9mIMv+U3isfVlOrzySl1ok/afj
SnSo5whchxSg2LtTa5Xu5YjAbdsVUpqFGT/LMwIDAQABAoIBAF9qCrVtt7k8scd8
Fnlcq7koXzDBLZVEXDUhbJVz5e54mjsDC0czsk3/5+awTsh5AexWk/ZrSJKgwjrY
gcBbw5illfipUb1YfqLnoKb2wfHjkXbZgLoFPe5JxthwG61YesjlkAjxwTieT4DD
OZME9Qw6TMncS+uySQXp+8Ei4SVbls+DNcJg1nubGBVrEUGZFSqBa8WL0JQxTfEs
YkVgmgaXEZjulCJ11c41ZUJBskVCxFEA5+WmYgBWoTii9TwT6PPd1c3V4j4hHjmU
YlWEVZo5m1/bvdeVvCtO5wGAZtERhRPequYIHiVqdZGrlHZpVI03AUs9vcbZeoNR
Hb5+kHkCgYEA+azXIw3A9pz1BTY1r+6gD4bHdT35T8FhgZyNxJDKBqlYpO4opMCS
wkC1FoLK4Lj8LFHRXcJdm9y1oUHJBJJzVxqhRnba5ZQaFW5RdgsolDJO26+81r8h
5r+jNNgB86WMzU9Lud3GIgyQpNLkY4XB8NuV7evrnJnBBfpg9Tw8740CgYEArQwQ
WUXikkKXa0fRAm8MWaLy813goIe+qNMEVuqtdMh/3WW8Smvrj6Sn6xPemH70XKWZ
Vt4y9pxO9p3goJtXiLwqepvuZmVy7/ds09V8yM1/d/2GwiBlM3D0UWArnk49l25v
oI7zxYEMigZjc3kdjlKlzFLiClJlmQzfoPzMlb8CgYEAh2Vntaa7wgEUDqN7MdEi
E8lvWPEmxk2EZxlS+AncxQgI/kf42n9kFtuoWHDNPFiUyCQGeeXxhZiHFs/qBwS0
b8QNOX0y79UE4CJXIsCiXNt7UD9ZFMvJwqyiAQIy7MIWPTCHTGAsFkLiHcAQAriC
l+88uy15NA9dUbSZ5+Om1/ECgYEAhKVGsue68VpSL03xjOgKk3swuBQx51umbkqy
fN2O8IHwYYlmd7WZ75XLkYq9ii9mqM3XaJsSfa77aFdEpFfvFUUHWszERYFmRUNo
DEkNSe8b0qJn9c5XRMNExEvvo31eAQIKVwy9F5wAPJ0BBrbETSBVLvYphrf6YQNZ
OFIPkIkCgYAvwwLvO6f1XwxT1dojDiVNKMZ9VQAlmbN4e9BJ9fQ8E3XLDWOLnn15
NIcOo2JGEAU1O8UItzR8mLbCEDoVreDUFshKfx+FOpNG4he9Tyv22WrFzpE2+JCQ
yG92ZWJBfCPWJkEkowetaggfo8UgrjQSTGHjww2QRFqMiKX8t8ruAA==
-----END RSA PRIVATE KEY-----
`,
      cert: `
-----BEGIN CERTIFICATE-----
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
wiiyGzROiashue2oiL80PVdxrQ==
-----END CERTIFICATE-----
`
     }
  },
  joi: {
    allowUnknown: true,
    abortEarly: false
  },
  database: {
    database: 'ucxzone_ucxz', //'sql5431252', //'sql5431252', //'ucxzone_ucxz', //'sql5431252', //'sql5431252', //
    username: 'ucxzone_remote',  //'sql5431252', //'sql5431252', //'ucxzone_remote', //'sql5431252', //'ucxzone_ucxz',//'sql5431252', //'ucxzone_remote', //'sql5431252', //
    password: 'wW4Fds9v', //'JmeY3URIRj', //'JmeY3URIRj', //'wW4Fds9v', //'JmeY3URIRj', //'wW4Fds9v', //'wW4Fds9v', //'JmeY3URIRj', //
    host: 'localhost', //'sql5.freemysqlhosting.net', //'sql5.freemysqlhosting.net', //'localhost', //'sql5.freemysqlhosting.net', //'sql5.freemysqlhosting.net', //'localhost', //
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
