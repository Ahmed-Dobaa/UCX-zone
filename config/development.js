const fs = require('fs')

module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: 'platform.ucx.zone',  //'localhost', //'135.181.62.49', //
    port: process.env.PORT || 2053, //8000, // 2053

     tls: {
      key: `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwAgdaIZhkqO95
l1bI1lqEYo7b25iCax8H7WgU7uVDWzzBgRsF2gaQ7toYy+9I8HbcZvVkUqDDqvui
ittU04FvQz0cTlak3aKVPvOhkMztAvt4QkqA3eV+crCmiaaysOVjmbAi9MlhPvSk
7EqQuSu0l487AU6m9vhaEDMRwiHqzkQqXb8Vtf7impxhKjfIPsl8G0qF4/RUATBv
0jC7iTk5YXN1ka6iEex/gg3j5nTcf5X9Z7zkhOnIiX93FuA+ty9jN6WjCfKguEE9
6n/U4GUhi13T2OaNV7jpUUVVQwcMFyLp/o4s+zxPZYCJQxsaQCoOlnF6m5dNM+D/
FARrpi1LAgMBAAECggEAPIoWGUxg7I6nAD2r3hzMuahk1v6rcICEBegE2t5pAUgK
l8xejR63D3b4kXrj7US4vYq0cTNylJrlPr1gP8cYSDrqdCgF6WNKnucuSa5SrltO
P8kdc0HfxCSS2lWSfvgVjrK4QO3NrqNG5stXwnvOqqlO3M7QTOG5/tB/oGYT4H1L
ExP8+W91BwmyPc2IMcKV9w+YNeg0Gw4sWCRfgkXKoLq9jGXAyp1ms+HpHq8zlUfY
bHPER2EPb2wPiQSjszbL82zoiWgG4rB2JrOEyWs7W6yFxXwST+7H+gyXLyB4lFBB
gB0BlMW+RzU4tDzEJDC8G1UcxEms93zuwZGtYuubwQKBgQDwRdHfwBO0IDlJR/hW
WWyAuIRxkyuG+Ct23FX1LQErpzRHL18fStq/AV5MwDEVu/UvwCpOoJzvqjygPzWq
cXLsgqncVrNfuqwAw/VJev8Fk8dLUy+GF/GsmU239ZmqQQdC5RulLOdCvAgvyWkS
HJrP9G2UnLkeNlvo/1VbtfHl0QKBgQC7h1eb3Dorbqa4szcgmzGuwAc9jOSDZh7p
3FdIRM//gXGsNFpXAgQr9NTn29FUFUI4ZpNkR/q0xQVE6mFlI0DF3IYcFYZht2zX
ZGJVBqLtC+S3pl4ET66vkLebr6lGY53nDlRMNsGa5XpvSDRt3y138k6QwwKNbVBS
r9uP4KS8WwKBgBaJRfUpq+9yMk1YTceznYS5SdrpReTj9Bey9PEJJpn0leezXsWt
nLTbqP+j6zaxqX6wFIfJcs7b9dHF+/+fonriipIbI7nv5WAxARnCSpc4VDIRfFyk
dEuPGYYOqDoa3VZ97MjiXFKbFl19E7jaK/8jWv/cb1SRHq/M+zGd8DFxAoGAAgDE
EsobZPNdnINth0+hDDjI2wNyPWUN13mfBQqXHieHy0sT2/INkVqgG4nhhoBjoK6X
zG5oYx3nnIDUYXwq6PIeDJa+RLTs2LAdzMKxYs7Jtpx0TJ99QirNi0ApErNlsF4a
0GWVU843rJCc3r+PgMR5yloK4O/V98whEDxaBhkCgYEAxuLdiZKqdolRFf0IHNVI
mq2eJlZ6zvIsIUo5M1suNoKNIwHpg/0hDfoYZStl9gL37Hhmn88HSLDOnGKqXN+u
kcKZSm7BshgU2kqTkJ48BKVgNxPeiK3eXaRWIxFx2fsLQuBjBi9eba46iwhc11mD
NrfTotfYeZlsomd01mrC6Lw=
-----END PRIVATE KEY-----
`,
      cert: `
-----BEGIN CERTIFICATE-----
MIIEFTCCAv2gAwIBAgIUcbaUhptsFTJVhGXPE/y1hZMGnj8wDQYJKoZIhvcNAQEL
BQAwgagxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQH
Ew1TYW4gRnJhbmNpc2NvMRkwFwYDVQQKExBDbG91ZGZsYXJlLCBJbmMuMRswGQYD
VQQLExJ3d3cuY2xvdWRmbGFyZS5jb20xNDAyBgNVBAMTK01hbmFnZWQgQ0EgMzRj
ZjU5MzU2OTFiMTM2OWE4Nzk5YTFjNDUxZjEzOTcwHhcNMjExMjI4MTcyMjAwWhcN
MzExMjI2MTcyMjAwWjAiMQswCQYDVQQGEwJVUzETMBEGA1UEAxMKQ2xvdWRmbGFy
ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALACB1ohmGSo73mXVsjW
WoRijtvbmIJrHwftaBTu5UNbPMGBGwXaBpDu2hjL70jwdtxm9WRSoMOq+6KK21TT
gW9DPRxOVqTdopU+86GQzO0C+3hCSoDd5X5ysKaJprKw5WOZsCL0yWE+9KTsSpC5
K7SXjzsBTqb2+FoQMxHCIerORCpdvxW1/uKanGEqN8g+yXwbSoXj9FQBMG/SMLuJ
OTlhc3WRrqIR7H+CDePmdNx/lf1nvOSE6ciJf3cW4D63L2M3paMJ8qC4QT3qf9Tg
ZSGLXdPY5o1XuOlRRVVDBwwXIun+jiz7PE9lgIlDGxpAKg6WcXqbl00z4P8UBGum
LUsCAwEAAaOBuzCBuDATBgNVHSUEDDAKBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAA
MB0GA1UdDgQWBBSjlavi7ttmqsCbCyzqYoZ30qFjzTAfBgNVHSMEGDAWgBRUB8Jf
D420Q3R4SwAgB8MVpWdLpjBTBgNVHR8ETDBKMEigRqBEhkJodHRwOi8vY3JsLmNs
b3VkZmxhcmUuY29tL2ZlZWE4Y2RkLTBjYTEtNGEyMi1hOGRkLWQ1MTE3NTBiZTBi
Ny5jcmwwDQYJKoZIhvcNAQELBQADggEBAHCTsu2UI6YKLZe352r648aEKGkPeNUC
jwVSHmcqNcf31C2dyXsR5Rqr6QPaxskFyB0oxAU6NFF0NtkyM0N5fgYCHpNA/Pv7
Dipl0ZipUIJaY7kN6m14nQbmSt7ZM9N+jZWy/8a5dtnq2k8ziYgZSAN784kfQQNG
wszoeJzP8wRINJQaK951/RYAZSJQx7BTFABTVW06M/aWmjRQ2qiB8Err8XUc3p+e
bB4Gn2nnSGOtTMxbGwGiO7LCoi0oOv8OHGtoQ32ZR7QBeauDmd9i1ZgNSSAttG88
6FvcBk8gvQVLE3OSmk0UAnhO/6T6WgWAk2QPlX0r3gDFQGwFN3ghiF0=
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
