const fs = require('fs')

module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: 'localhost',  //'localhost', //'platform.ucx.zone',  //'localhost', //'localhost', //'platform.ucx.zone',  //'localhost', //'135.181.62.49', //
    port: process.env.PORT || 2053, //8000, // 2053


//  test
     tls: {
      key: fs.readFileSync(path.join(__dirname,'./key.pem')),
      cert: fs.readFileSync(path.join(__dirname,'./cert.pem')),
      
//       `
// -----BEGIN PRIVATE KEY-----
// MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkYtAb2LzTPq+v
// jyevnDGmUksFHuGtWVWx8uoDTIAeJ7csUT+xzi1i/MQaVctcNqD2xrgdD702BLrk
// uSUxqfEYQQ9Ihed397yyDVt4sJNbNWl1FS3bxTG5bQJugIwes1dgAfyH6ygdfHNK
// tuSPIq8/ivXu4PCjh1iYOnoeHZuaEz3HkkCiMeqCrx870hDXKqdBXKb9KJpKTVCO
// EvgyqrbwxQhORJvxiRrEOPtvXYlmjbMFqjtMMiQ82lKI/1m0io8ATzbohOJXERA6
// NT1qIFqzEuLHEeFti+3NhBevUo7lEC/4QX588HSxFKfhS0cYMlEhtOWYhJaQJENn
// gvb9mwXHAgMBAAECggEALqTrMDubuMU8zK/uLuI/JFaNevJ8TtfefRPUWwNGB0h1
// rVmQnT9HmaLnciGOBqhpnBxe+cARjFZjQatXZnQ2OQ+c6pM0TtI49Lzdi61u4p6R
// Qeu0i3u01EyeOAS5vaxdypxFr7uGMnexry2eRQ8ucvVXO2UQYxZwiSFurUTxdhIz
// JXUTwRRVMUNQGu4ciZ/+TskuI43hy6J3xzESKk13gOXZJBVQES+CswMIuVSQLR4d
// 84CJHYndKl43ONy/OdXEQTz8u1hrHTbPpBNPwQA4yoX0P+fCkhl0ztc18o3B9aPr
// gr/BLtwuHP69375gWLL7Yl5wbp872DEv2l99+WTeoQKBgQDUK3vR15SLkG6PK7Lv
// 52ffX51sMGqPhA/QFNg4b+ksmEWci+/457CVF1Jt7132g3luBZCErkUMk8lrAmmV
// HZtY3BUOuEd3mYqaqx3p8IjJDQxs2IkKLp6dq6vjj/2RejtFrN9i2VctaT6I0UZh
// PlI7lE5+ImzmQr5PH0CUZEYNWwKBgQDGWEx9kw1l6uvod6tjWWyou0Nf2UwJpvWY
// IQCw9O0EctsFpBDZWpPpeYAiZHKj4RCz/Yh/MT2dvfHFO4fx+7DZNFgj/7YWP0nR
// +W/t0c64UmXZ58Lmo3n3Mnleqe+pgXATAZr93h1eD8SSK6ibThKwNolVDgXscR8j
// pQ3K76K5BQKBgCHpbVoF9hU0madCmdAkkYKveq7vMikMN6bPnhuvL3rUP9Qcvddv
// 2NaLqr4tkzwymXcPZqD+ZcTz3i6/bPbLi6fxTWBT7gBcxz2feiGJM6PG9SR0m7rH
// 5sxWwxuVSTc2bUDet7nJ+VglyTv/Dxu95VDmjIE2qWdIZbipyx2sxVGfAoGBALT5
// 4GE8Ch+SaMpmVrWB5MlYhLMyPFUaSEEU6+KKuLE0c3AEMXOBWDDSMf4vlQK+21S/
// 4wnbThNeOvnxxasgMk8dmcbPDb/i42J5rI1cwLgiRti6xXVYeHL7VQ7xE8KgXjiZ
// YGh/gGBRFtUgjOmYJSkvucMn1nPVC8qkUZ93ZAxZAoGBALHCVVFH1RE8lv9/zxi9
// +S0joGbgveJcJF44VtD5AkXPSo2o7j8nqIUzzK8LTtWL+aU9RFe+v0j0h2wviPvs
// Q+I4pRYARGcyqyKJ76Fd7bE/8OGOJ/se23ImjJot86Clfi3oG2nFIm8407AeL5Pc
// Xdk9hopbSRwkJmPTUJo+vUgt
// -----END PRIVATE KEY-----
// `,
//       cert: `
// -----BEGIN CERTIFICATE-----
// MIIGQTCCBSmgAwIBAgIQLTKdzC6WBsdxvIya3hOXvDANBgkqhkiG9w0BAQsFADCB
// jzELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G
// A1UEBxMHU2FsZm9yZDEYMBYGA1UEChMPU2VjdGlnbyBMaW1pdGVkMTcwNQYDVQQD
// Ey5TZWN0aWdvIFJTQSBEb21haW4gVmFsaWRhdGlvbiBTZWN1cmUgU2VydmVyIENB
// MB4XDTIyMDQyNjAwMDAwMFoXDTIzMDQyNjIzNTk1OVowHDEaMBgGA1UEAxMRcGxh
// dGZvcm0udWN4LnpvbmUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCk
// YtAb2LzTPq+vjyevnDGmUksFHuGtWVWx8uoDTIAeJ7csUT+xzi1i/MQaVctcNqD2
// xrgdD702BLrkuSUxqfEYQQ9Ihed397yyDVt4sJNbNWl1FS3bxTG5bQJugIwes1dg
// AfyH6ygdfHNKtuSPIq8/ivXu4PCjh1iYOnoeHZuaEz3HkkCiMeqCrx870hDXKqdB
// XKb9KJpKTVCOEvgyqrbwxQhORJvxiRrEOPtvXYlmjbMFqjtMMiQ82lKI/1m0io8A
// TzbohOJXERA6NT1qIFqzEuLHEeFti+3NhBevUo7lEC/4QX588HSxFKfhS0cYMlEh
// tOWYhJaQJENngvb9mwXHAgMBAAGjggMJMIIDBTAfBgNVHSMEGDAWgBSNjF7EVK2K
// 4Xfpm/mbBeG4AY1h4TAdBgNVHQ4EFgQUW3P2XdxWESh2NeLe2Yb7LtAnh/4wDgYD
// VR0PAQH/BAQDAgWgMAwGA1UdEwEB/wQCMAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEG
// CCsGAQUFBwMCMEkGA1UdIARCMEAwNAYLKwYBBAGyMQECAgcwJTAjBggrBgEFBQcC
// ARYXaHR0cHM6Ly9zZWN0aWdvLmNvbS9DUFMwCAYGZ4EMAQIBMIGEBggrBgEFBQcB
// AQR4MHYwTwYIKwYBBQUHMAKGQ2h0dHA6Ly9jcnQuc2VjdGlnby5jb20vU2VjdGln
// b1JTQURvbWFpblZhbGlkYXRpb25TZWN1cmVTZXJ2ZXJDQS5jcnQwIwYIKwYBBQUH
// MAGGF2h0dHA6Ly9vY3NwLnNlY3RpZ28uY29tMDMGA1UdEQQsMCqCEXBsYXRmb3Jt
// LnVjeC56b25lghV3d3cucGxhdGZvcm0udWN4LnpvbmUwggF9BgorBgEEAdZ5AgQC
// BIIBbQSCAWkBZwB1AK33vvp8/xDIi509nB4+GGq0Zyldz7EMJMqFhjTr3IKKAAAB
// gGNsqkYAAAQDAEYwRAIgenTE6A5rkCuOoOKamV96/9l+r4h8y5DGsOgJdp8g40AC
// IHFmGDdSeTfA/MDZgOjn7YUUbXs39AAj8zElThq7dWAwAHcAejKMVNi3LbYg6jjg
// Uh7phBZwMhOFTTvSK8E6V6NS61IAAAGAY2yqFwAABAMASDBGAiEAuqWeKqeUI8gE
// +wR3Gykw0zGJHH+BvFa8HnN8lV3jPtYCIQCySicxyov2fWm6/OBwCCCpvj8ssin2
// FuDVX3wPxk1CCgB1AOg+0No+9QY1MudXKLyJa8kD08vREWvs62nhd31tBr1uAAAB
// gGNsqfYAAAQDAEYwRAIgf6SuLkeNfj5QMOsKhOKzgqn1Cevafot+w1+4WXr7/VoC
// IGgecKD5yOa0JZeWDATVu3G+PX0AiVIqA39WktFQu4qdMA0GCSqGSIb3DQEBCwUA
// A4IBAQDVBJLjROdWLsQfxR6kPNlkoy2OgmVjmBCxMfD1cgLFXgjZhwsGjel+7BdA
// SeHHEDnL963fYA0eqOflRNfu2ZML9Fy6t2PMWzaY1/N0HJbstx+i7Mw47RtPXDuv
// s/3WtiWYPAz2KqhfCVMkMhnul2cvvxD+sg2CYR3az/AzmkEKHpvgrKJl3AHKy2AF
// R5apvt1RXKmgYfDnRrgJrK/TeuYU7mYszKyVH+XCKhtp9DoKkm6UikmK6RX4zCrQ
// hmUWKSG9IpPOwmVCzGn5sbAGzkx4808LFGdP3LYYicbgmLoxKH4rg915ZqKSD4mT
// k8WDGwBTrfKAk6oaNVkHSlKKrLFa
// -----END CERTIFICATE-----
// `
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
