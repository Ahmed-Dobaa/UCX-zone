const fs = require('fs')

module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: 'platform.ucx.zone',  //'localhost', //'135.181.62.49', //
    port: process.env.PORT || 2050, //8000, // 2053


 // test
     tls: {
      key: `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWGZ8fgg05WG+x
/FASp/M4ng3XxHGkthq+cH95z2t4OKuiyBaAWVxXx2g9R5H/JPFhTKVZfUDfxZVJ
Y9sINDITdZ7BMTqRTpdj3l66ig86YQD3P2BpgOMOgG3yTfW5J9P20W1CYSk885Xk
iOCGmeyFr9H3Iu0OOIAgqh0f3zm3/d3tv7zTpfIm3XUWYSaZzcH3F0I2jpJXIBGX
BiqSbyazJb6BQkezRt4WptGXR9iWrL6j8cCVFE9oXP6eOdx9Om1d5y7wsN90rqkO
pxLyRN9+hcSBNmngSE92+Sfsd6NxapXkSrxfUnEHExMNefOUmV/TTvz0fPp/9LGG
f0t81sj1AgMBAAECggEAFv+pmDjgMsjNNtFjyJ1CA1L3KbZwfsERHmP3TZ56bO+p
gFL+F8uBn+xLxklp5X6Sb2FMYdCSp3cSElAntznkJzL7WsVvBSzsFk5M3rz15c+F
ywmD0dGGkog5R04Yl0sv+dOFaRwG0gVYlLQfalYekj3Q0DtwO5bWLKwZdNMF4D2y
ytkFZcXhH7xvAZnBnaW7M3TJAm9XnGJ27HNHdCMQzTldMEeK4nfEzn8kNjYbAQ11
ndMwOKC5/ZSTAVjXOjcwIwLNsrH2IWG4adC5ic/A+HFcAdBFGEYH0t1wbzfD88RK
HZmnV10PY20aTVBlm3y4akCyBijaPxNPNQvJ6QeKAQKBgQDuecBQTbmXLasr2QGE
4CgwDQRJeE8toCq41iq7gg8G8WXytIQLTicdgK6cla1/1CbHkb/9PNtm+v53plZV
Oq0BP3QTV1EDjZ41ZJos9/7atFyLib8xLCpROpL5/jIA0kwa68gFX24X6hh+mgJU
r0cMJVD556BrwDfFqs3Q2Rkd9wKBgQDl1VBJqGwaxOvujC6kXXPLLiW35hbh9gKb
s6+nz/4y8kCUwhks51rVTa43uIAe5knLmy7szkwDQJ8WdktcrRUw/AP0atdkgh/O
AieKP8D42vLznWtVe9upjH+o0OIHcEYe+YmEWCsVmsd2Zkc5Oi6xrj4ltcZvCuGj
aKzcyquFcwKBgQC0pdwNuOMm5zxsScXBz0ACLkoaEZ4BFPxn6iySwBH8E29D7IS+
P6SXz7v199hnJeF+eiUygyA8oVOUdZeeloUpldSrNhCznVrEXYIBIJeZOtmEBoOj
jy47PCDMaUedobBvED8D+udeDEIj3Sx41BIA3F+7/z9hgEl/XkTsuRgyvwKBgQDK
0cW6WqCbtu+lYZu/fKC0ypKKiMfku95tXNJEOu5OMy3+mJLy529nENgPYAfgPMUe
omF0pFC8BgjeH6I9tJgg1CUBSk+t6I78kzYlcEFw2nbPuTmBBH5CTzRQ25S7j76x
kvBiFBRhSmd++p8bx1Zxghxh1tm4IFgihjsV1NwsNQKBgExwrUwkHFHEdOFQkxz/
zUoK58V7JzTqwxbfdBRnCXB5r61LQc6pjwe05dCh4gqUyQY5QLc/HPNcW6Yr9aL/
KiyG7R9Wm90lgwSlyb4qbk/n707F4sKd29LeRmXlSRjUGjWjsfpXjjazcV01kU2K
DGfG0Q4Y6f00GL9bR0OhLzRB
-----END PRIVATE KEY-----
`,
      cert: `
-----BEGIN CERTIFICATE-----
MIIEnDCCA4SgAwIBAgIUXti/IJ6vfSQsNMxZ42bbEuvv++YwDQYJKoZIhvcNAQEL
BQAwgYsxCzAJBgNVBAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMTQw
MgYDVQQLEytDbG91ZEZsYXJlIE9yaWdpbiBTU0wgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlh
MB4XDTIxMTIyODIzNTkwMFoXDTM2MTIyNDIzNTkwMFowYjEZMBcGA1UEChMQQ2xv
dWRGbGFyZSwgSW5jLjEdMBsGA1UECxMUQ2xvdWRGbGFyZSBPcmlnaW4gQ0ExJjAk
BgNVBAMTHUNsb3VkRmxhcmUgT3JpZ2luIENlcnRpZmljYXRlMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1hmfH4INOVhvsfxQEqfzOJ4N18RxpLYavnB/
ec9reDirosgWgFlcV8doPUeR/yTxYUylWX1A38WVSWPbCDQyE3WewTE6kU6XY95e
uooPOmEA9z9gaYDjDoBt8k31uSfT9tFtQmEpPPOV5Ijghpnsha/R9yLtDjiAIKod
H985t/3d7b+806XyJt11FmEmmc3B9xdCNo6SVyARlwYqkm8msyW+gUJHs0beFqbR
l0fYlqy+o/HAlRRPaFz+njncfTptXecu8LDfdK6pDqcS8kTffoXEgTZp4EhPdvkn
7HejcWqV5Eq8X1JxBxMTDXnzlJlf00789Hz6f/Sxhn9LfNbI9QIDAQABo4IBHjCC
ARowDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBTnnJE36B8/FJeONy3SConkad5BMzAf
BgNVHSMEGDAWgBQk6FNXXXw0QIep65TbuuEWePwppDBABggrBgEFBQcBAQQ0MDIw
MAYIKwYBBQUHMAGGJGh0dHA6Ly9vY3NwLmNsb3VkZmxhcmUuY29tL29yaWdpbl9j
YTAfBgNVHREEGDAWggoqLnVjeC56b25lggh1Y3guem9uZTA4BgNVHR8EMTAvMC2g
K6AphidodHRwOi8vY3JsLmNsb3VkZmxhcmUuY29tL29yaWdpbl9jYS5jcmwwDQYJ
KoZIhvcNAQELBQADggEBADdpjU8kiPUjth0s7xoAZGl+l3ItHXw/gRKvTz6kt+pe
zOgFIrbLGNOj1BmEYOzsuyY32NNt9iRFBPE7n9pJuVpJkgYBc73yWmqYxAn0Bb0V
BMZOBdY2coOr+MQcZ3kDsowGNQ7OaI4oerjlZSjA14DIgHLMrTAH7jqV151Z7TrL
97EqhaNdCbBDq5PhqE8RlL1HEgyRVqy/lHWFG6/2FxABMitAOybzZKkLSZ8MYDqu
qavrqkm6VRnNbd+YDt3ARW1DMjprqhZ6O7+9AdIn4fh8bMqTvxLMG0aGFW/rAnLN
4AoH+m8TbLqCLzC6ZCm6wpAchx/UmFHvIcjsWwPFJ9Q=
-----END CERTIFICATE-----
`
     }
  },
  joi: {
    allowUnknown: true,
    abortEarly: false
  },
  database: {
    database: 'ucxzone_ucxz', //'sql5431252', //'sql5431252', //
    username: 'ucxzone_remote', //'sql5431252', //'ucxzone_ucxz',//'sql5431252', //'ucxzone_remote', //'sql5431252', //
    password: 'wW4Fds9v', //'JmeY3URIRj', //'wW4Fds9v', //'wW4Fds9v', //'JmeY3URIRj', //
    host: 'localhost', //'sql5.freemysqlhosting.net', //'sql5.freemysqlhosting.net', //'localhost', //
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
