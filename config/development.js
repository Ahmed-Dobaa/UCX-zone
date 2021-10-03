const fs = require('fs')

module.exports = {
  frontEnd: { host: 'http://localhost/frontEnd' },
  connection: {
    host: 'platform.ucx.zone', //'localhost', //'platform.ucx.zone', //'135.181.62.49', //
    port: process.env.PORT || 2053, //8000, // 2053

     tls: {
      key: `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAvGfD3dRB7rG1ggwZXAPULl/ykHau4Jk4Fal3D76dNosQi+wJ
sPxdDt7cjPyscBnmtPCauTqKvF3XvpgVYM1qTK9mqorEEw4mfx/GVq6A9OgTc6OI
Hy0fnDrGh9Ik4vvfmo8qz6GSwvWAOyqplGPU1pac9Squs9AYQHtqLPc6ulABxX+/
2uUkichqdKHSAzQEDOAVyXTlDNGMAnZrw04MtfP4sJxoZW33Q+WI65J+hmAcstbU
WIrSmSC42JcsfmkA2+W6mYtzXgbUg7jKQfxiXh4sev3KBVE12J9UVKJYy8a+lDIC
WK7qOKpIVR1kkS/Ay4i5qj6imihggBC46NECwQIDAQABAoIBABwGv48/JPOyAdMv
o5IZi7W+ViIBVbBZeotWYzy3WUGk3DhES4jFcb5ljp92ctxWLgiahhmpyLuOpipX
C08UH4z6xqX18Ib5IubkPifk25AS+dnI6NXia4JdB+1qaExPtYqTY4Xxfhh8Vq/2
f7VwSFgHnZ+m0sgy23i0Iy4/NMBEJzhQyB0ITH6hGF6RwUAwBIQpBc+qzbfmhO0K
/fs9mAoD8q1i+4eFbzZhBH5s6bfEZF2B8CaX0ILypQI9T2xIWAMlw6w2P53KfYr5
SSDVNXsCojd20pM7d3nNl8Eo30+WTevdKzm+HsnEMrkxDd1OSKNyl1dHW+lwoQaw
dDvnp9UCgYEA3CHn07FHCQADDT/fScgbKOpWs/1i6Lmf2IqIFR97xqyGFFolYzEp
J7Olh4HOQ8tEqLxD7nxmngGDuCYIytyRaWZhWPROdVLbiCZ7LYCiuBKgbyJgd5Mx
42pTGPQsq92bHMuPD3/qNsLZXeZJWasIQ9E7/s4Z2XFBSjKi2+uVk18CgYEA2xp3
5sIRL/g6Pk7U+IQrTDOyKcSzma1jTx4ghNmPBESeHJoreZ+yG7GKX+h0vUX2Zd1b
a99YkDdsDpC54BSZvmNuMnwXoVJa0YnH1mrKmO6OpQBbTj4uRWY1Swih/Q+id6Iq
IM1xDUTywDlsUVEGYH5ggjI6miKPXpXdi5OYPd8CgYEAmo2fk4yrABGnEt1eaxH4
p7Bn8XUcxaLWLJWO163EHIgylwV3rH3ulDZYKJylcgm8CfAsjbt/3L3ZeigSEkPs
QCEmher5Tvw+sAe8ggUHuc8yHvT2391TsISNFT8SQhST/BKbPdmkWpBRRtERfMhN
RDgaNFsF4RnYKj0FBP0RhmcCgYBLrGGbDo33HmmnWXzO9H8ry3MOYAST4EG7crFS
kP2HQNfHEyxOzmwqinA7XcLsGDzYw9IueK5S6QFmKnA4R4UuL5NA1oEm05XQZyDh
GnMszL/xlyTx6iH7ECj56FpiV8MKRLT+LVaNebHJ2Etj7nMgYqWcchKxZ5xS07n3
2hsrywKBgQCigAD2vss3rhxE78D+3cX/VT6meubHI/3pBlah27fv2kGWRFDdNek6
uj1gSMkViU846+vaVZ0DaCnQ6YtmerF+DqVY0YJ9XZgS7sMUnBUgkaU2D5x4Q99U
EvsxaAacnu5EZUrPQi/TIBvQC3KLAxDHgKFP5CM8EW3+WIF3uLvwYQ==
-----END RSA PRIVATE KEY-----
`,
      cert: `
-----BEGIN CERTIFICATE-----
MIIFKDCCBBCgAwIBAgISA0m+DDD2L4tMmhgwJ5SsCvVaMA0GCSqGSIb3DQEBCwUA
MDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD
EwJSMzAeFw0yMTA5MjkwOTM1MjBaFw0yMTEyMjgwOTM1MTlaMBwxGjAYBgNVBAMT
EXBsYXRmb3JtLnVjeC56b25lMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAvGfD3dRB7rG1ggwZXAPULl/ykHau4Jk4Fal3D76dNosQi+wJsPxdDt7cjPys
cBnmtPCauTqKvF3XvpgVYM1qTK9mqorEEw4mfx/GVq6A9OgTc6OIHy0fnDrGh9Ik
4vvfmo8qz6GSwvWAOyqplGPU1pac9Squs9AYQHtqLPc6ulABxX+/2uUkichqdKHS
AzQEDOAVyXTlDNGMAnZrw04MtfP4sJxoZW33Q+WI65J+hmAcstbUWIrSmSC42Jcs
fmkA2+W6mYtzXgbUg7jKQfxiXh4sev3KBVE12J9UVKJYy8a+lDICWK7qOKpIVR1k
kS/Ay4i5qj6imihggBC46NECwQIDAQABo4ICTDCCAkgwDgYDVR0PAQH/BAQDAgWg
MB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0G
A1UdDgQWBBSrzzItCRgJiT2ZaOwEwj7d3iGW8TAfBgNVHSMEGDAWgBQULrMXt1hW
y65QCUDmH6+dixTCxjBVBggrBgEFBQcBAQRJMEcwIQYIKwYBBQUHMAGGFWh0dHA6
Ly9yMy5vLmxlbmNyLm9yZzAiBggrBgEFBQcwAoYWaHR0cDovL3IzLmkubGVuY3Iu
b3JnLzAcBgNVHREEFTATghFwbGF0Zm9ybS51Y3guem9uZTBMBgNVHSAERTBDMAgG
BmeBDAECATA3BgsrBgEEAYLfEwEBATAoMCYGCCsGAQUFBwIBFhpodHRwOi8vY3Bz
LmxldHNlbmNyeXB0Lm9yZzCCAQQGCisGAQQB1nkCBAIEgfUEgfIA8AB2AH0+8viP
/4hVaCTCwMqeUol5K8UOeAl/LmqXaJl+IvDXAAABfDEfgcEAAAQDAEcwRQIhAKDI
Yyn2OWuzbTzNkvM5v4ihWaQG8LxnPeKV9/r0xBvdAiBkdn8lyzDW2WL6xLSbrzci
v06v7AxBJ9H75EWGAIeFsAB2AG9Tdqwx8DEZ2JkApFEV/3cVHBHZAsEAKQaNsgia
N9kTAAABfDEfgewAAAQDAEcwRQIhAO7MJHzooMNc/GSXoFu1U72a7lqHuE2E1HD5
3FGXhC4mAiAHHyyIjPwfnZQc/VzIhryRJHmzWpbJpBVF+vVz94xKszANBgkqhkiG
9w0BAQsFAAOCAQEAp1ZDs+fxxC+07O+xYHC3pd/xgjN6rIvGSrgu+AS6bfcmNPW5
xadc0HHPGJzqDUQwD8rWl7cUmYkMQcgltT1Pxc+9FUr1kHFANwj2UqV+SUddX3FV
P1gkTTTlc5aeuK/u1gqRp6WwNTwCsZFRvU4YQPcTixSdb01tyCmxVKg4kEGzS16X
sqsarIKHAZpbtc2Ia0Bhf6EWQ9GTX8nTqUcs/idabbnUrLGTOMD8eh40+O/uSCiS
tK1RnKm/YRnvqyOoAv63CPD9yrGHUmWEW0mHjQvhLojAnfuH4DkNP1VZ+jArDovS
mpPwKPXrtRdSMAgz/qiYyoyBvBSoIg/E7yWcHQ==
-----END CERTIFICATE-----
` }
  },
  joi: {
    allowUnknown: true,
    abortEarly: false
  },
  database: {
    database: 'ucxzone_ucxz',//'sql5431252', //'ucxzone_ucxz',//
    username: 'ucxzone_remote', //'sql5431252', //'ucxzone_remote', //
    password: 'wW4Fds9v', //'JmeY3URIRj', //'wW4Fds9v', //
    host: 'localhost', //'sql5.freemysqlhosting.net', //'localhost', //
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
