const fs = require('fs');

module.exports = {
  frontEnd: { host: '' },
  connection: {
    host: '135.181.62.49',
    port: 8000, //process.env.PORT,
    protocol: 'https:'  
     tls: {
     key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUWac05vEc/v8U
VRiHTMqJt5uI4f/dUIUWuJoedFoBxK9qQl52BVuZexZ/VpO85ASdKtYiXWHso+ad
pwTfmMn7c4lgyRkkKUJG3Q4X6fJmcBQNKUsCcxidjag+TFOARxyaayx1yED9ooWl
Ju+ucXYRwDEjACD8PynaQmtSlQpSueAxteFz8oTcJpnUn6SA1Llod+U3I8ycCDJS
/sGPtxYN4lgjni9/wXTmLfwU/awAytYi6lKFu1SYEwwquabyMiOQnEACRyIs6Rab
kXQFoMb8Xy/gGPcn9qyCH2kCHgKeArmOIL5JFBYhQpmHM+GCEqTbRtUXbSZpJT4F
TL+vkOCxAgMBAAECggEAFUmvk4QbY9bEZ5toTBgMreW0N/LAHcW2seJrwOXVKBw5
oaNpqNc8qZRHWxio0uTg+YiT0vodmQWNVvypZmkAxq58dTFzzcY9GLGMeiU/4bkW
qYMcO/Ch5RmQZj5smI2IdoqL+HrM2SBz2Wyf1pMVTQ5BXsrig6cpYPILpEnAsS42
Zg39LxspPnUhNSWGG+TrKA28PrdEFXhW9N6siPSF/TjYwEQjcXGLrnML9FV9U5TF
E+VJX4MjRShUeQkqszKwR96oLRa4fh3fqafStWUbrU+Q5KhpXWzzeiuByrHu/aaX
1O5OiwSh48T7wAS2MMK1WYD3LlyCqIevpWwVfr8RYQKBgQDpgWNZ5uWvaZnUjEB4
0esR63ZE4HbLL48LgbrU+4rP10dgpdw3imAHlZ1yo+hIMNHlnb1C/cOud6kR+wYn
ylt5kyFsg9vCxrwSM1f6+qLoi59L3uBFKAGTMh6181XXhWBBd7FnrifvBE3x//cP
gW/NQtfljyUyGCvxTehmvSFsJQKBgQDozotKzQRnWOV3zz10ufBQtt+jIGCuUlmm
uzm9DlNvrpW/GsB/zohtFMOQtp5nbvIiSqLrVynOK86tX0CjYPwrLSLrWa3w8JCy
wT2Ww8VT8UkeDcuXqnS2iBLvweAu2mKCPLFxhG7OVc+AInTEEtYxmKekWyvwEUqm
1pMR1672nQKBgE7zl7MbFggkbYXnUhlH6PJrKdcKCkCTOQuL9q7yyjGSOakdC4Of
/u4xkUXk07ItB5tapVaUVOiVvw28UY18p0dJDyEQyGpoJckFoTbULebw5pCRsETR
zQ6HAMlGmHzBtRUNsmc7BHeVfgFYKaINgs7lTfhpWQtCDwGM9Qpf4oAdAoGBAMOV
EeyLhJGWW2FmF8lClKQanpMbFl4dDPhH/l/X8zy2PVPJk8NLrc2GTi37XeSjjoRE
k86G8bYlk4KPrWwUhIV5bAaw1rK+R7IFKkrIubSl1rmK+Wm3aEoY01/dTwvNqEil
2KT3j2eFK8gIKnS3Jn+QMfagKa+Lt12mkvPAcVr5AoGBAMFCkyzZLESlR2Ur1uUf
tY03kD29YXJptLSoKV844ZtkW8vmKNwQjckhWxDeoaxQtVxWNWD18TX7JF6lTTJT
8mLMtSA23KSMYqF9LFn0VLBG67mBIcj4goO5sF1vL+5GEqdeYhmJ1aHQoU59Zs6A
WYAzfpVeDP4xmtRhJqiPPbcY
-----END PRIVATE KEY-----`, //fs.readFileSync('./bundle.key'),
      cert: `-----BEGIN CERTIFICATE-----
MIIEFTCCAv2gAwIBAgIUUMkgRcEl7BqcYBVusWbxpMvfKZ0wDQYJKoZIhvcNAQEL
BQAwgagxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQH
Ew1TYW4gRnJhbmNpc2NvMRkwFwYDVQQKExBDbG91ZGZsYXJlLCBJbmMuMRswGQYD
VQQLExJ3d3cuY2xvdWRmbGFyZS5jb20xNDAyBgNVBAMTK01hbmFnZWQgQ0EgMzRj
ZjU5MzU2OTFiMTM2OWE4Nzk5YTFjNDUxZjEzOTcwHhcNMjEwOTI5MDg0OTAwWhcN
MzEwOTI3MDg0OTAwWjAiMQswCQYDVQQGEwJVUzETMBEGA1UEAxMKQ2xvdWRmbGFy
ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANRZpzTm8Rz+/xRVGIdM
yom3m4jh/91QhRa4mh50WgHEr2pCXnYFW5l7Fn9Wk7zkBJ0q1iJdYeyj5p2nBN+Y
yftziWDJGSQpQkbdDhfp8mZwFA0pSwJzGJ2NqD5MU4BHHJprLHXIQP2ihaUm765x
dhHAMSMAIPw/KdpCa1KVClK54DG14XPyhNwmmdSfpIDUuWh35TcjzJwIMlL+wY+3
Fg3iWCOeL3/BdOYt/BT9rADK1iLqUoW7VJgTDCq5pvIyI5CcQAJHIizpFpuRdAWg
xvxfL+AY9yf2rIIfaQIeAp4CuY4gvkkUFiFCmYcz4YISpNtG1RdtJmklPgVMv6+Q
4LECAwEAAaOBuzCBuDATBgNVHSUEDDAKBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAA
MB0GA1UdDgQWBBTFJZ7JkAfaBuxRWN97agZX0ecifDAfBgNVHSMEGDAWgBRUB8Jf
D420Q3R4SwAgB8MVpWdLpjBTBgNVHR8ETDBKMEigRqBEhkJodHRwOi8vY3JsLmNs
b3VkZmxhcmUuY29tL2ZlZWE4Y2RkLTBjYTEtNGEyMi1hOGRkLWQ1MTE3NTBiZTBi
Ny5jcmwwDQYJKoZIhvcNAQELBQADggEBAKnSg7EhUcd+xPl+X0OQtN+leq5Yjb+m
ILOD40bfJmI1nut4nA9nWyuS5ZaWT1ucDz+MBnq50rXQDFZYXve+VscZdCwzdI/p
9v6PgoccvhfDin1gNGCrSslfyFmIloCUZHEL38hVqXByLg8R36LiOQeAQXMLSCQI
avWbYxrLa7K2W9JJD3MKRRlHczw/WW/7zAGwzhi8wTPiRB/T312uSdb1Mhmszu2p
P6Tny8ypRgohUBhO+Kwok4337UiL1L15vNwjfrMAUQDu6y1usU2xmNA5BgMEPUW6
T3NgqjAjo5sfpVt+9LWPZEK//hLi+g7uHT57cNiOn/ugYEFx0hIR6ho=
-----END CERTIFICATE-----`     }
     }
  },
  joi: {
    allowUnknown: false,
    abortEarly: false
  },
  database: {
    database: 'sql5431252', //'',
    username: 'sql5431252', //'root',
    password: 'JmeY3URIRj',
    host: 'sql5.freemysqlhosting.net',
    port: 3306,
    dialect: 'mysql',
    debug: false,
    sync: false
  },
  jwt: {
    TokenTtl: '1d',
    stayLoggedInTokenTtl: '30d',
    authKey: 'o12omucSlk7maWgbsAzSuG6eDlrPjpRb'
  },
  mailing: {
    host: 'mail.ucx.zone',
    port: 465,
    secure: true, // true for 465, false for other ports
    from: '',
    subjects: { activationMail: 'Activation Mail' },
    auth: {
      user: '', // generated ethereal user
      pass: ')' // generated ethereal password
    }
  },
};
