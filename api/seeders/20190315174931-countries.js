'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('countries', [
      {
        'id': 1,
        'code': 'AF',
        createdAt: new Date()
      },
      {
        'id': 2,
        'code': 'AL'
        ,
        createdAt: new Date()
      },
      {
        'id': 3,
        'code': 'DZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 4,
        'code': 'DS'
        ,
        createdAt: new Date()
      },
      {
        'id': 5,
        'code': 'AD'
        ,
        createdAt: new Date()
      },
      {
        'id': 6,
        'code': 'AO'
        ,
        createdAt: new Date()
      },
      {
        'id': 7,
        'code': 'AI'
        ,
        createdAt: new Date()
      },
      {
        'id': 8,
        'code': 'AQ'
        ,
        createdAt: new Date()
      },
      {
        'id': 9,
        'code': 'AG'
        ,
        createdAt: new Date()
      },
      {
        'id': 10,
        'code': 'AR'
        ,
        createdAt: new Date()
      },
      {
        'id': 11,
        'code': 'AM'
        ,
        createdAt: new Date()
      },
      {
        'id': 12,
        'code': 'AW'
        ,
        createdAt: new Date()
      },
      {
        'id': 13,
        'code': 'AU'
        ,
        createdAt: new Date()
      },
      {
        'id': 14,
        'code': 'AT'
        ,
        createdAt: new Date()
      },
      {
        'id': 15,
        'code': 'AZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 16,
        'code': 'BS'
        ,
        createdAt: new Date()
      },
      {
        'id': 17,
        'code': 'BH'
        ,
        createdAt: new Date()
      },
      {
        'id': 18,
        'code': 'BD'
        ,
        createdAt: new Date()
      },
      {
        'id': 19,
        'code': 'BB'
        ,
        createdAt: new Date()
      },
      {
        'id': 20,
        'code': 'BY'
        ,
        createdAt: new Date()
      },
      {
        'id': 21,
        'code': 'BE'
        ,
        createdAt: new Date()
      },
      {
        'id': 22,
        'code': 'BZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 23,
        'code': 'BJ'
        ,
        createdAt: new Date()
      },
      {
        'id': 24,
        'code': 'BM'
        ,
        createdAt: new Date()
      },
      {
        'id': 25,
        'code': 'BT'
        ,
        createdAt: new Date()
      },
      {
        'id': 26,
        'code': 'BO'
        ,
        createdAt: new Date()
      },
      {
        'id': 27,
        'code': 'BA'
        ,
        createdAt: new Date()
      },
      {
        'id': 28,
        'code': 'BW'
        ,
        createdAt: new Date()
      },
      {
        'id': 29,
        'code': 'BV'
        ,
        createdAt: new Date()
      },
      {
        'id': 30,
        'code': 'BR'
        ,
        createdAt: new Date()
      },
      {
        'id': 31,
        'code': 'IO'
        ,
        createdAt: new Date()
      },
      {
        'id': 32,
        'code': 'BN'
        ,
        createdAt: new Date()
      },
      {
        'id': 33,
        'code': 'BG'
        ,
        createdAt: new Date()
      },
      {
        'id': 34,
        'code': 'BF'
        ,
        createdAt: new Date()
      },
      {
        'id': 35,
        'code': 'BI'
        ,
        createdAt: new Date()
      },
      {
        'id': 36,
        'code': 'KH'
        ,
        createdAt: new Date()
      },
      {
        'id': 37,
        'code': 'CM'
        ,
        createdAt: new Date()
      },
      {
        'id': 38,
        'code': 'CA'
        ,
        createdAt: new Date()
      },
      {
        'id': 39,
        'code': 'CV'
        ,
        createdAt: new Date()
      },
      {
        'id': 40,
        'code': 'KY'
        ,
        createdAt: new Date()
      },
      {
        'id': 41,
        'code': 'CF'
        ,
        createdAt: new Date()
      },
      {
        'id': 42,
        'code': 'TD'
        ,
        createdAt: new Date()
      },
      {
        'id': 43,
        'code': 'CL'
        ,
        createdAt: new Date()
      },
      {
        'id': 44,
        'code': 'CN'
        ,
        createdAt: new Date()
      },
      {
        'id': 45,
        'code': 'CX'
        ,
        createdAt: new Date()
      },
      {
        'id': 46,
        'code': 'CC'
        ,
        createdAt: new Date()
      },
      {
        'id': 47,
        'code': 'CO'
        ,
        createdAt: new Date()
      },
      {
        'id': 48,
        'code': 'KM'
        ,
        createdAt: new Date()
      },
      {
        'id': 49,
        'code': 'CG'
        ,
        createdAt: new Date()
      },
      {
        'id': 50,
        'code': 'CK'
        ,
        createdAt: new Date()
      },
      {
        'id': 51,
        'code': 'CR'
        ,
        createdAt: new Date()
      },
      {
        'id': 52,
        'code': 'HR'
        ,
        createdAt: new Date()
      },
      {
        'id': 53,
        'code': 'CU'
        ,
        createdAt: new Date()
      },
      {
        'id': 54,
        'code': 'CY'
        ,
        createdAt: new Date()
      },
      {
        'id': 55,
        'code': 'CZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 56,
        'code': 'DK'
        ,
        createdAt: new Date()
      },
      {
        'id': 57,
        'code': 'DJ'
        ,
        createdAt: new Date()
      },
      {
        'id': 58,
        'code': 'DM'
        ,
        createdAt: new Date()
      },
      {
        'id': 59,
        'code': 'DO'
        ,
        createdAt: new Date()
      },
      {
        'id': 60,
        'code': 'TP'
        ,
        createdAt: new Date()
      },
      {
        'id': 61,
        'code': 'EC'
        ,
        createdAt: new Date()
      },
      {
        'id': 62,
        'code': 'EG'
        ,
        createdAt: new Date()
      },
      {
        'id': 63,
        'code': 'SV'
        ,
        createdAt: new Date()
      },
      {
        'id': 64,
        'code': 'GQ'
        ,
        createdAt: new Date()
      },
      {
        'id': 65,
        'code': 'ER'
        ,
        createdAt: new Date()
      },
      {
        'id': 66,
        'code': 'EE'
        ,
        createdAt: new Date()
      },
      {
        'id': 67,
        'code': 'ET'
        ,
        createdAt: new Date()
      },
      {
        'id': 68,
        'code': 'FK'
        ,
        createdAt: new Date()
      },
      {
        'id': 69,
        'code': 'FO'
        ,
        createdAt: new Date()
      },
      {
        'id': 70,
        'code': 'FJ'
        ,
        createdAt: new Date()
      },
      {
        'id': 71,
        'code': 'FI'
        ,
        createdAt: new Date()
      },
      {
        'id': 72,
        'code': 'FR'
        ,
        createdAt: new Date()
      },
      {
        'id': 73,
        'code': 'FX'
        ,
        createdAt: new Date()
      },
      {
        'id': 74,
        'code': 'GF'
        ,
        createdAt: new Date()
      },
      {
        'id': 75,
        'code': 'PF'
        ,
        createdAt: new Date()
      },
      {
        'id': 76,
        'code': 'TF'
        ,
        createdAt: new Date()
      },
      {
        'id': 77,
        'code': 'GA'
        ,
        createdAt: new Date()
      },
      {
        'id': 78,
        'code': 'GM'
        ,
        createdAt: new Date()
      },
      {
        'id': 79,
        'code': 'GE'
        ,
        createdAt: new Date()
      },
      {
        'id': 80,
        'code': 'DE'
        ,
        createdAt: new Date()
      },
      {
        'id': 81,
        'code': 'GH'
        ,
        createdAt: new Date()
      },
      {
        'id': 82,
        'code': 'GI'
        ,
        createdAt: new Date()
      },
      {
        'id': 83,
        'code': 'GK'
        ,
        createdAt: new Date()
      },
      {
        'id': 84,
        'code': 'GR'
        ,
        createdAt: new Date()
      },
      {
        'id': 85,
        'code': 'GL'
        ,
        createdAt: new Date()
      },
      {
        'id': 86,
        'code': 'GD'
        ,
        createdAt: new Date()
      },
      {
        'id': 87,
        'code': 'GP'
        ,
        createdAt: new Date()
      },
      {
        'id': 88,
        'code': 'GU'
        ,
        createdAt: new Date()
      },
      {
        'id': 89,
        'code': 'GT'
        ,
        createdAt: new Date()
      },
      {
        'id': 90,
        'code': 'GN'
        ,
        createdAt: new Date()
      },
      {
        'id': 91,
        'code': 'GW'
        ,
        createdAt: new Date()
      },
      {
        'id': 92,
        'code': 'GY'
        ,
        createdAt: new Date()
      },
      {
        'id': 93,
        'code': 'HT'
        ,
        createdAt: new Date()
      },
      {
        'id': 94,
        'code': 'HM'
        ,
        createdAt: new Date()
      },
      {
        'id': 95,
        'code': 'HN'
        ,
        createdAt: new Date()
      },
      {
        'id': 96,
        'code': 'HK'
        ,
        createdAt: new Date()
      },
      {
        'id': 97,
        'code': 'HU'
        ,
        createdAt: new Date()
      },
      {
        'id': 98,
        'code': 'IS'
        ,
        createdAt: new Date()
      },
      {
        'id': 99,
        'code': 'IN'
        ,
        createdAt: new Date()
      },
      {
        'id': 100,
        'code': 'IM'
        ,
        createdAt: new Date()
      },
      {
        'id': 101,
        'code': 'ID'
        ,
        createdAt: new Date()
      },
      {
        'id': 102,
        'code': 'IR'
        ,
        createdAt: new Date()
      },
      {
        'id': 103,
        'code': 'IQ'
        ,
        createdAt: new Date()
      },
      {
        'id': 104,
        'code': 'IE'
        ,
        createdAt: new Date()
      },
      {
        'id': 105,
        'code': 'IL'
        ,
        createdAt: new Date()
      },
      {
        'id': 106,
        'code': 'IT'
        ,
        createdAt: new Date()
      },
      {
        'id': 107,
        'code': 'CI'
        ,
        createdAt: new Date()
      },
      {
        'id': 108,
        'code': 'JE'
        ,
        createdAt: new Date()
      },
      {
        'id': 109,
        'code': 'JM'
        ,
        createdAt: new Date()
      },
      {
        'id': 110,
        'code': 'JP'
        ,
        createdAt: new Date()
      },
      {
        'id': 111,
        'code': 'JO'
        ,
        createdAt: new Date()
      },
      {
        'id': 112,
        'code': 'KZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 113,
        'code': 'KE'
        ,
        createdAt: new Date()
      },
      {
        'id': 114,
        'code': 'KI'
        ,
        createdAt: new Date()
      },
      {
        'id': 115,
        'code': 'KP'
        ,
        createdAt: new Date()
      },
      {
        'id': 116,
        'code': 'KR'
        ,
        createdAt: new Date()
      },
      {
        'id': 117,
        'code': 'XK'
        ,
        createdAt: new Date()
      },
      {
        'id': 118,
        'code': 'KW'
        ,
        createdAt: new Date()
      },
      {
        'id': 119,
        'code': 'KG'
        ,
        createdAt: new Date()
      },
      {
        'id': 120,
        'code': 'LA'
        ,
        createdAt: new Date()
      },
      {
        'id': 121,
        'code': 'LV'
        ,
        createdAt: new Date()
      },
      {
        'id': 122,
        'code': 'LB'
        ,
        createdAt: new Date()
      },
      {
        'id': 123,
        'code': 'LS'
        ,
        createdAt: new Date()
      },
      {
        'id': 124,
        'code': 'LR'
        ,
        createdAt: new Date()
      },
      {
        'id': 125,
        'code': 'LY'
        ,
        createdAt: new Date()
      },
      {
        'id': 126,
        'code': 'LI'
        ,
        createdAt: new Date()
      },
      {
        'id': 127,
        'code': 'LT'
        ,
        createdAt: new Date()
      },
      {
        'id': 128,
        'code': 'LU'
        ,
        createdAt: new Date()
      },
      {
        'id': 129,
        'code': 'MO'
        ,
        createdAt: new Date()
      },
      {
        'id': 130,
        'code': 'MK'
        ,
        createdAt: new Date()
      },
      {
        'id': 131,
        'code': 'MG'
        ,
        createdAt: new Date()
      },
      {
        'id': 132,
        'code': 'MW'
        ,
        createdAt: new Date()
      },
      {
        'id': 133,
        'code': 'MY'
        ,
        createdAt: new Date()
      },
      {
        'id': 134,
        'code': 'MV'
        ,
        createdAt: new Date()
      },
      {
        'id': 135,
        'code': 'ML'
        ,
        createdAt: new Date()
      },
      {
        'id': 136,
        'code': 'MT'
        ,
        createdAt: new Date()
      },
      {
        'id': 137,
        'code': 'MH'
        ,
        createdAt: new Date()
      },
      {
        'id': 138,
        'code': 'MQ'
        ,
        createdAt: new Date()
      },
      {
        'id': 139,
        'code': 'MR'
        ,
        createdAt: new Date()
      },
      {
        'id': 140,
        'code': 'MU'
        ,
        createdAt: new Date()
      },
      {
        'id': 141,
        'code': 'TY'
        ,
        createdAt: new Date()
      },
      {
        'id': 142,
        'code': 'MX'
        ,
        createdAt: new Date()
      },
      {
        'id': 143,
        'code': 'FM'
        ,
        createdAt: new Date()
      },
      {
        'id': 144,
        'code': 'MD'
        ,
        createdAt: new Date()
      },
      {
        'id': 145,
        'code': 'MC'
        ,
        createdAt: new Date()
      },
      {
        'id': 146,
        'code': 'MN'
        ,
        createdAt: new Date()
      },
      {
        'id': 147,
        'code': 'ME'
        ,
        createdAt: new Date()
      },
      {
        'id': 148,
        'code': 'MS'
        ,
        createdAt: new Date()
      },
      {
        'id': 149,
        'code': 'MA'
        ,
        createdAt: new Date()
      },
      {
        'id': 150,
        'code': 'MZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 151,
        'code': 'MM'
        ,
        createdAt: new Date()
      },
      {
        'id': 152,
        'code': 'NA'
        ,
        createdAt: new Date()
      },
      {
        'id': 153,
        'code': 'NR'
        ,
        createdAt: new Date()
      },
      {
        'id': 154,
        'code': 'NP'
        ,
        createdAt: new Date()
      },
      {
        'id': 155,
        'code': 'NL'
        ,
        createdAt: new Date()
      },
      {
        'id': 156,
        'code': 'AN'
        ,
        createdAt: new Date()
      },
      {
        'id': 157,
        'code': 'NC'
        ,
        createdAt: new Date()
      },
      {
        'id': 158,
        'code': 'NZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 159,
        'code': 'NI'
        ,
        createdAt: new Date()
      },
      {
        'id': 160,
        'code': 'NE'
        ,
        createdAt: new Date()
      },
      {
        'id': 161,
        'code': 'NG'
        ,
        createdAt: new Date()
      },
      {
        'id': 162,
        'code': 'NU'
        ,
        createdAt: new Date()
      },
      {
        'id': 163,
        'code': 'NF'
        ,
        createdAt: new Date()
      },
      {
        'id': 164,
        'code': 'MP'
        ,
        createdAt: new Date()
      },
      {
        'id': 165,
        'code': 'NO'
        ,
        createdAt: new Date()
      },
      {
        'id': 166,
        'code': 'OM'
        ,
        createdAt: new Date()
      },
      {
        'id': 167,
        'code': 'PK'
        ,
        createdAt: new Date()
      },
      {
        'id': 168,
        'code': 'PW'
        ,
        createdAt: new Date()
      },
      {
        'id': 169,
        'code': 'PS'
        ,
        createdAt: new Date()
      },
      {
        'id': 170,
        'code': 'PA'
        ,
        createdAt: new Date()
      },
      {
        'id': 171,
        'code': 'PG'
        ,
        createdAt: new Date()
      },
      {
        'id': 172,
        'code': 'PY'
        ,
        createdAt: new Date()
      },
      {
        'id': 173,
        'code': 'PE'
        ,
        createdAt: new Date()
      },
      {
        'id': 174,
        'code': 'PH'
        ,
        createdAt: new Date()
      },
      {
        'id': 175,
        'code': 'PN'
        ,
        createdAt: new Date()
      },
      {
        'id': 176,
        'code': 'PL'
        ,
        createdAt: new Date()
      },
      {
        'id': 177,
        'code': 'PT'
        ,
        createdAt: new Date()
      },
      {
        'id': 178,
        'code': 'PR'
        ,
        createdAt: new Date()
      },
      {
        'id': 179,
        'code': 'QA'
        ,
        createdAt: new Date()
      },
      {
        'id': 180,
        'code': 'RE'
        ,
        createdAt: new Date()
      },
      {
        'id': 181,
        'code': 'RO'
        ,
        createdAt: new Date()
      },
      {
        'id': 182,
        'code': 'RU'
        ,
        createdAt: new Date()
      },
      {
        'id': 183,
        'code': 'RW'
        ,
        createdAt: new Date()
      },
      {
        'id': 184,
        'code': 'KN'
        ,
        createdAt: new Date()
      },
      {
        'id': 185,
        'code': 'LC'
        ,
        createdAt: new Date()
      },
      {
        'id': 186,
        'code': 'VC'
        ,
        createdAt: new Date()
      },
      {
        'id': 187,
        'code': 'WS'
        ,
        createdAt: new Date()
      },
      {
        'id': 188,
        'code': 'SM'
        ,
        createdAt: new Date()
      },
      {
        'id': 189,
        'code': 'ST'
        ,
        createdAt: new Date()
      },
      {
        'id': 190,
        'code': 'SA'
        ,
        createdAt: new Date()
      },
      {
        'id': 191,
        'code': 'SN'
        ,
        createdAt: new Date()
      },
      {
        'id': 192,
        'code': 'RS'
        ,
        createdAt: new Date()
      },
      {
        'id': 193,
        'code': 'SC'
        ,
        createdAt: new Date()
      },
      {
        'id': 194,
        'code': 'SL'
        ,
        createdAt: new Date()
      },
      {
        'id': 195,
        'code': 'SG'
        ,
        createdAt: new Date()
      },
      {
        'id': 196,
        'code': 'SK'
        ,
        createdAt: new Date()
      },
      {
        'id': 197,
        'code': 'SI'
        ,
        createdAt: new Date()
      },
      {
        'id': 198,
        'code': 'SB'
        ,
        createdAt: new Date()
      },
      {
        'id': 199,
        'code': 'SO'
        ,
        createdAt: new Date()
      },
      {
        'id': 200,
        'code': 'ZA'
        ,
        createdAt: new Date()
      },
      {
        'id': 201,
        'code': 'GS'
        ,
        createdAt: new Date()
      },
      {
        'id': 202,
        'code': 'SS'
        ,
        createdAt: new Date()
      },
      {
        'id': 203,
        'code': 'ES'
        ,
        createdAt: new Date()
      },
      {
        'id': 204,
        'code': 'LK'
        ,
        createdAt: new Date()
      },
      {
        'id': 205,
        'code': 'SH'
        ,
        createdAt: new Date()
      },
      {
        'id': 206,
        'code': 'PM'
        ,
        createdAt: new Date()
      },
      {
        'id': 207,
        'code': 'SD'
        ,
        createdAt: new Date()
      },
      {
        'id': 208,
        'code': 'SR'
        ,
        createdAt: new Date()
      },
      {
        'id': 209,
        'code': 'SJ'
        ,
        createdAt: new Date()
      },
      {
        'id': 210,
        'code': 'SZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 211,
        'code': 'SE'
        ,
        createdAt: new Date()
      },
      {
        'id': 212,
        'code': 'CH'
        ,
        createdAt: new Date()
      },
      {
        'id': 213,
        'code': 'SY'
        ,
        createdAt: new Date()
      },
      {
        'id': 214,
        'code': 'TW'
        ,
        createdAt: new Date()
      },
      {
        'id': 215,
        'code': 'TJ'
        ,
        createdAt: new Date()
      },
      {
        'id': 216,
        'code': 'TZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 217,
        'code': 'TH'
        ,
        createdAt: new Date()
      },
      {
        'id': 218,
        'code': 'TG'
        ,
        createdAt: new Date()
      },
      {
        'id': 219,
        'code': 'TK'
        ,
        createdAt: new Date()
      },
      {
        'id': 220,
        'code': 'TO'
        ,
        createdAt: new Date()
      },
      {
        'id': 221,
        'code': 'TT'
        ,
        createdAt: new Date()
      },
      {
        'id': 222,
        'code': 'TN'
        ,
        createdAt: new Date()
      },
      {
        'id': 223,
        'code': 'TR'
        ,
        createdAt: new Date()
      },
      {
        'id': 224,
        'code': 'TM'
        ,
        createdAt: new Date()
      },
      {
        'id': 225,
        'code': 'TC'
        ,
        createdAt: new Date()
      },
      {
        'id': 226,
        'code': 'TV'
        ,
        createdAt: new Date()
      },
      {
        'id': 227,
        'code': 'UG'
        ,
        createdAt: new Date()
      },
      {
        'id': 228,
        'code': 'UA'
        ,
        createdAt: new Date()
      },
      {
        'id': 229,
        'code': 'AE'
        ,
        createdAt: new Date()
      },
      {
        'id': 230,
        'code': 'GB'
        ,
        createdAt: new Date()
      },
      {
        'id': 231,
        'code': 'US'
        ,
        createdAt: new Date()
      },
      {
        'id': 232,
        'code': 'UM'
        ,
        createdAt: new Date()
      },
      {
        'id': 233,
        'code': 'UY'
        ,
        createdAt: new Date()
      },
      {
        'id': 234,
        'code': 'UZ'
        ,
        createdAt: new Date()
      },
      {
        'id': 235,
        'code': 'VU'
        ,
        createdAt: new Date()
      },
      {
        'id': 236,
        'code': 'VA'
        ,
        createdAt: new Date()
      },
      {
        'id': 237,
        'code': 'VE'
        ,
        createdAt: new Date()
      },
      {
        'id': 238,
        'code': 'VN'
        ,
        createdAt: new Date()
      },
      {
        'id': 239,
        'code': 'VG'
        ,
        createdAt: new Date()
      },
      {
        'id': 240,
        'code': 'VI'
        ,
        createdAt: new Date()
      },
      {
        'id': 241,
        'code': 'WF'
        ,
        createdAt: new Date()
      },
      {
        'id': 242,
        'code': 'EH'
        ,
        createdAt: new Date()
      },
      {
        'id': 243,
        'code': 'YE'
        ,
        createdAt: new Date()
      },
      {
        'id': 244,
        'code': 'ZR'
        ,
        createdAt: new Date()
      },
      {
        'id': 245,
        'code': 'ZM'
        ,
        createdAt: new Date()
      },
      {
        'id': 246,
        'code': 'ZW'
      }
    ], {});
    const countries = await queryInterface.sequelize.query(
      'SELECT id from countries;'
    );

    const countriesRows = countries[0];

    return await queryInterface.bulkInsert('countriesTranslation', [
      {
        'id': '1','countryId': countriesRows[0].id
        ,'languageId': '1'
        ,'name': 'Afghanistan'
        ,
        createdAt: new Date()
      },
      {
        'id': '2'
        ,'countryId': countriesRows[1].id
        ,'languageId': '1'
        ,'name': 'Albania'
        ,
        createdAt: new Date()
      },
      {
        'id': '3'
        ,'countryId': countriesRows[2].id
        ,'languageId': '1'
        ,'name': 'Algeria'
        ,
        createdAt: new Date()
      },
      {
        'id': '4'
        ,'countryId': countriesRows[3].id
        ,'languageId': '1'
        ,'name': 'American Samoa'
        ,
        createdAt: new Date()
      },
      {
        'id': '5'
        ,'countryId': countriesRows[4].id
        ,'languageId': '1'
        ,'name': 'Andorra'
        ,
        createdAt: new Date()
      },
      {
        'id': '6'
        ,'countryId': countriesRows[5].id
        ,'languageId': '1'
        ,'name': 'Angola'
        ,
        createdAt: new Date()
      },
      {
        'id': '7'
        ,'countryId': countriesRows[6].id
        ,'languageId': '1'
        ,'name': 'Anguilla'
        ,
        createdAt: new Date()
      },
      {
        'id': '8'
        ,'countryId': countriesRows[7].id
        ,'languageId': '1'
        ,'name': 'Antarctica'
        ,
        createdAt: new Date()
      },
      {
        'id': '9'
        ,'countryId': countriesRows[8].id
        ,'languageId': '1'
        ,'name': 'Antigua and Barbuda'
        ,
        createdAt: new Date()
      },
      {
        'id': '10'
        ,'countryId': countriesRows[9].id
        ,'languageId': '1'
        ,'name': 'Argentina'
        ,
        createdAt: new Date()
      },
      {
        'id': '11'
        ,'countryId': countriesRows[10].id
        ,'languageId': '1'
        ,'name': 'Armenia'
        ,
        createdAt: new Date()
      },
      {
        'id': '12'
        ,'countryId': countriesRows[11].id
        ,'languageId': '1'
        ,'name': 'Aruba'
        ,
        createdAt: new Date()
      },
      {
        'id': '13'
        ,'countryId': countriesRows[12].id
        ,'languageId': '1'
        ,'name': 'Australia'
        ,
        createdAt: new Date()
      },
      {
        'id': '14'
        ,'countryId': countriesRows[13].id
        ,'languageId': '1'
        ,'name': 'Austria'
        ,
        createdAt: new Date()
      },
      {
        'id': '15'
        ,'countryId': countriesRows[14].id
        ,'languageId': '1'
        ,'name': 'Azerbaijan'
        ,
        createdAt: new Date()
      },
      {
        'id': '16'
        ,'countryId': countriesRows[15].id
        ,'languageId': '1'
        ,'name': 'Bahamas'
        ,
        createdAt: new Date()
      },
      {
        'id': '17'
        ,'countryId': countriesRows[16].id
        ,'languageId': '1'
        ,'name': 'Bahrain'
        ,
        createdAt: new Date()
      },
      {
        'id': '18'
        ,'countryId': countriesRows[17].id
        ,'languageId': '1'
        ,'name': 'Bangladesh'
        ,
        createdAt: new Date()
      },
      {
        'id': '19'
        ,'countryId': countriesRows[18].id
        ,'languageId': '1'
        ,'name': 'Barbados'
        ,
        createdAt: new Date()
      },
      {
        'id': '20'
        ,'countryId': countriesRows[19].id
        ,'languageId': '1'
        ,'name': 'Belarus'
        ,
        createdAt: new Date()
      },
      {
        'id': '21'
        ,'countryId': countriesRows[20].id
        ,'languageId': '1'
        ,'name': 'Belgium'
        ,
        createdAt: new Date()
      },
      {
        'id': '22'
        ,'countryId': countriesRows[21].id
        ,'languageId': '1'
        ,'name': 'Belize'
        ,
        createdAt: new Date()
      },
      {
        'id': '23'
        ,'countryId': countriesRows[22].id
        ,'languageId': '1'
        ,'name': 'Benin'
        ,
        createdAt: new Date()
      },
      {
        'id': '24'
        ,'countryId': countriesRows[23].id
        ,'languageId': '1'
        ,'name': 'Bermuda'
        ,
        createdAt: new Date()
      },
      {
        'id': '25'
        ,'countryId': countriesRows[24].id
        ,'languageId': '1'
        ,'name': 'Bhutan'
        ,
        createdAt: new Date()
      },
      {
        'id': '26'
        ,'countryId': countriesRows[25].id
        ,'languageId': '1'
        ,'name': 'Bolivia'
        ,
        createdAt: new Date()
      },
      {
        'id': '27'
        ,'countryId': countriesRows[26].id
        ,'languageId': '1'
        ,'name': 'Bosnia and Herzegovina'
        ,
        createdAt: new Date()
      },
      {
        'id': '28'
        ,'countryId': countriesRows[27].id
        ,'languageId': '1'
        ,'name': 'Botswana'
        ,
        createdAt: new Date()
      },
      {
        'id': '29'
        ,'countryId': countriesRows[28].id
        ,'languageId': '1'
        ,'name': 'Bouvet Island'
        ,
        createdAt: new Date()
      },
      {
        'id': '30'
        ,'countryId': countriesRows[29].id
        ,'languageId': '1'
        ,'name': 'Brazil'
        ,
        createdAt: new Date()
      },
      {
        'id': '31'
        ,'countryId': countriesRows[30].id
        ,'languageId': '1'
        ,'name': 'British Indian Ocean Territory'
        ,
        createdAt: new Date()
      },
      {
        'id': '32'
        ,'countryId': countriesRows[31].id
        ,'languageId': '1'
        ,'name': 'Brunei Darussalam'
        ,
        createdAt: new Date()
      },
      {
        'id': '33'
        ,'countryId': countriesRows[32].id
        ,'languageId': '1'
        ,'name': 'Bulgaria'
        ,
        createdAt: new Date()
      },
      {
        'id': '34'
        ,'countryId': countriesRows[33].id
        ,'languageId': '1'
        ,'name': 'Burkina Faso'
        ,
        createdAt: new Date()
      },
      {
        'id': '35'
        ,'countryId': countriesRows[34].id
        ,'languageId': '1'
        ,'name': 'Burundi'
        ,
        createdAt: new Date()
      },
      {
        'id': '36'
        ,'countryId': countriesRows[35].id
        ,'languageId': '1'
        ,'name': 'Cambodia'
        ,
        createdAt: new Date()
      },
      {
        'id': '37'
        ,'countryId': countriesRows[36].id
        ,'languageId': '1'
        ,'name': 'Cameroon'
        ,
        createdAt: new Date()
      },
      {
        'id': '38'
        ,'countryId': countriesRows[37].id
        ,'languageId': '1'
        ,'name': 'Canada'
        ,
        createdAt: new Date()
      },
      {
        'id': '39'
        ,'countryId': countriesRows[38].id
        ,'languageId': '1'
        ,'name': 'Cape Verde'
        ,
        createdAt: new Date()
      },
      {
        'id': '40'
        ,'countryId': countriesRows[39].id
        ,'languageId': '1'
        ,'name': 'Cayman Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '41'
        ,'countryId': countriesRows[40].id
        ,'languageId': '1'
        ,'name': 'Central African Republic'
        ,
        createdAt: new Date()
      },
      {
        'id': '42'
        ,'countryId': countriesRows[41].id
        ,'languageId': '1'
        ,'name': 'Chad'
        ,
        createdAt: new Date()
      },
      {
        'id': '43'
        ,'countryId': countriesRows[42].id
        ,'languageId': '1'
        ,'name': 'Chile'
        ,
        createdAt: new Date()
      },
      {
        'id': '44'
        ,'countryId': countriesRows[43].id
        ,'languageId': '1'
        ,'name': 'China'
        ,
        createdAt: new Date()
      },
      {
        'id': '45'
        ,'countryId': countriesRows[44].id
        ,'languageId': '1'
        ,'name': 'Christmas Island'
        ,
        createdAt: new Date()
      },
      {
        'id': '46'
        ,'countryId': countriesRows[45].id
        ,'languageId': '1'
        ,'name': 'Cocos (Keeling) Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '47'
        ,'countryId': countriesRows[46].id
        ,'languageId': '1'
        ,'name': 'Colombia'
        ,
        createdAt: new Date()
      },
      {
        'id': '48'
        ,'countryId': countriesRows[47].id
        ,'languageId': '1'
        ,'name': 'Comoros'
        ,
        createdAt: new Date()
      },
      {
        'id': '49'
        ,'countryId': countriesRows[48].id
        ,'languageId': '1'
        ,'name': 'Congo'
        ,
        createdAt: new Date()
      },
      {
        'id': '50'
        ,'countryId': countriesRows[49].id
        ,'languageId': '1'
        ,'name': 'Cook Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '51'
        ,'countryId': countriesRows[50].id
        ,'languageId': '1'
        ,'name': 'Costa Rica'
        ,
        createdAt: new Date()
      },
      {
        'id': '52'
        ,'countryId': countriesRows[51].id
        ,'languageId': '1'
        ,'name': 'Croatia (Hrvatska)'
        ,
        createdAt: new Date()
      },
      {
        'id': '53'
        ,'countryId': countriesRows[52].id
        ,'languageId': '1'
        ,'name': 'Cuba'
        ,
        createdAt: new Date()
      },
      {
        'id': '54'
        ,'countryId': countriesRows[53].id
        ,'languageId': '1'
        ,'name': 'Cyprus'
        ,
        createdAt: new Date()
      },
      {
        'id': '55'
        ,'countryId': countriesRows[54].id
        ,'languageId': '1'
        ,'name': 'Czech Republic'
        ,
        createdAt: new Date()
      },
      {
        'id': '56'
        ,'countryId': countriesRows[55].id
        ,'languageId': '1'
        ,'name': 'Denmark'
        ,
        createdAt: new Date()
      },
      {
        'id': '57'
        ,'countryId': countriesRows[56].id
        ,'languageId': '1'
        ,'name': 'Djibouti'
        ,
        createdAt: new Date()
      },
      {
        'id': '58'
        ,'countryId': countriesRows[57].id
        ,'languageId': '1'
        ,'name': 'Dominica'
        ,
        createdAt: new Date()
      },
      {
        'id': '59'
        ,'countryId': countriesRows[58].id
        ,'languageId': '1'
        ,'name': 'Dominican Republic'
        ,
        createdAt: new Date()
      },
      {
        'id': '60'
        ,'countryId': countriesRows[59].id
        ,'languageId': '1'
        ,'name': 'East Timor'
        ,
        createdAt: new Date()
      },
      {
        'id': '61'
        ,'countryId': countriesRows[60].id
        ,'languageId': '1'
        ,'name': 'Ecuador'
        ,
        createdAt: new Date()
      },
      {
        'id': '62'
        ,'countryId': countriesRows[61].id
        ,'languageId': '1'
        ,'name': 'Egypt'
        ,
        createdAt: new Date()
      },
      {
        'id': '63'
        ,'countryId': countriesRows[62].id
        ,'languageId': '1'
        ,'name': 'El Salvador'
        ,
        createdAt: new Date()
      },
      {
        'id': '64'
        ,'countryId': countriesRows[63].id
        ,'languageId': '1'
        ,'name': 'Equatorial Guinea'
        ,
        createdAt: new Date()
      },
      {
        'id': '65'
        ,'countryId': countriesRows[64].id
        ,'languageId': '1'
        ,'name': 'Eritrea'
        ,
        createdAt: new Date()
      },
      {
        'id': '66'
        ,'countryId': countriesRows[65].id
        ,'languageId': '1'
        ,'name': 'Estonia'
        ,
        createdAt: new Date()
      },
      {
        'id': '67'
        ,'countryId': countriesRows[66].id
        ,'languageId': '1'
        ,'name': 'Ethiopia'
        ,
        createdAt: new Date()
      },
      {
        'id': '68'
        ,'countryId': countriesRows[67].id
        ,'languageId': '1'
        ,'name': 'Falkland Islands (Malvinas)'
        ,
        createdAt: new Date()
      },
      {
        'id': '69'
        ,'countryId': countriesRows[68].id
        ,'languageId': '1'
        ,'name': 'Faroe Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '70'
        ,'countryId': countriesRows[69].id
        ,'languageId': '1'
        ,'name': 'Fiji'
        ,
        createdAt: new Date()
      },
      {
        'id': '71'
        ,'countryId': countriesRows[70].id
        ,'languageId': '1'
        ,'name': 'Finland'
        ,
        createdAt: new Date()
      },
      {
        'id': '72'
        ,'countryId': countriesRows[71].id
        ,'languageId': '1'
        ,'name': 'France'
        ,
        createdAt: new Date()
      },
      {
        'id': '73'
        ,'countryId': countriesRows[72].id
        ,'languageId': '1'
        ,'name': 'France, Metropolitan'
        ,
        createdAt: new Date()
      },
      {
        'id': '74'
        ,'countryId': countriesRows[73].id
        ,'languageId': '1'
        ,'name': 'French Guiana'
        ,
        createdAt: new Date()
      },
      {
        'id': '75'
        ,'countryId': countriesRows[74].id
        ,'languageId': '1'
        ,'name': 'French Polynesia'
        ,
        createdAt: new Date()
      },
      {
        'id': '76'
        ,'countryId': countriesRows[75].id
        ,'languageId': '1'
        ,'name': 'French Southern Territories'
        ,
        createdAt: new Date()
      },
      {
        'id': '77'
        ,'countryId': countriesRows[76].id
        ,'languageId': '1'
        ,'name': 'Gabon'
        ,
        createdAt: new Date()
      },
      {
        'id': '78'
        ,'countryId': countriesRows[77].id
        ,'languageId': '1'
        ,'name': 'Gambia'
        ,
        createdAt: new Date()
      },
      {
        'id': '79'
        ,'countryId': countriesRows[78].id
        ,'languageId': '1'
        ,'name': 'Georgia'
        ,
        createdAt: new Date()
      },
      {
        'id': '80'
        ,'countryId': countriesRows[79].id
        ,'languageId': '1'
        ,'name': 'Germany'
        ,
        createdAt: new Date()
      },
      {
        'id': '81'
        ,'countryId': countriesRows[80].id
        ,'languageId': '1'
        ,'name': 'Ghana'
        ,
        createdAt: new Date()
      },
      {
        'id': '82'
        ,'countryId': countriesRows[81].id
        ,'languageId': '1'
        ,'name': 'Gibraltar'
        ,
        createdAt: new Date()
      },
      {
        'id': '83'
        ,'countryId': countriesRows[82].id
        ,'languageId': '1'
        ,'name': 'Guernsey'
        ,
        createdAt: new Date()
      },
      {
        'id': '84'
        ,'countryId': countriesRows[83].id
        ,'languageId': '1'
        ,'name': 'Greece'
        ,
        createdAt: new Date()
      },
      {
        'id': '85'
        ,'countryId': countriesRows[84].id
        ,'languageId': '1'
        ,'name': 'Greenland'
        ,
        createdAt: new Date()
      },
      {
        'id': '86'
        ,'countryId': countriesRows[85].id
        ,'languageId': '1'
        ,'name': 'Grenada'
        ,
        createdAt: new Date()
      },
      {
        'id': '87'
        ,'countryId': countriesRows[86].id
        ,'languageId': '1'
        ,'name': 'Guadeloupe'
        ,
        createdAt: new Date()
      },
      {
        'id': '88'
        ,'countryId': countriesRows[87].id
        ,'languageId': '1'
        ,'name': 'Guam'
        ,
        createdAt: new Date()
      },
      {
        'id': '89'
        ,'countryId': countriesRows[88].id
        ,'languageId': '1'
        ,'name': 'Guatemala'
        ,
        createdAt: new Date()
      },
      {
        'id': '90'
        ,'countryId': countriesRows[89].id
        ,'languageId': '1'
        ,'name': 'Guinea'
        ,
        createdAt: new Date()
      },
      {
        'id': '91'
        ,'countryId': countriesRows[90].id
        ,'languageId': '1'
        ,'name': 'Guinea-Bissau'
        ,
        createdAt: new Date()
      },
      {
        'id': '92'
        ,'countryId': countriesRows[91].id
        ,'languageId': '1'
        ,'name': 'Guyana'
        ,
        createdAt: new Date()
      },
      {
        'id': '93'
        ,'countryId': countriesRows[92].id
        ,'languageId': '1'
        ,'name': 'Haiti'
        ,
        createdAt: new Date()
      },
      {
        'id': '94'
        ,'countryId': countriesRows[93].id
        ,'languageId': '1'
        ,'name': 'Heard and Mc Donald Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '95'
        ,'countryId': countriesRows[94].id
        ,'languageId': '1'
        ,'name': 'Honduras'
        ,
        createdAt: new Date()
      },
      {
        'id': '96'
        ,'countryId': countriesRows[95].id
        ,'languageId': '1'
        ,'name': 'Hong Kong'
        ,
        createdAt: new Date()
      },
      {
        'id': '97'
        ,'countryId': countriesRows[96].id
        ,'languageId': '1'
        ,'name': 'Hungary'
        ,
        createdAt: new Date()
      },
      {
        'id': '98'
        ,'countryId': countriesRows[97].id
        ,'languageId': '1'
        ,'name': 'Iceland'
        ,
        createdAt: new Date()
      },
      {
        'id': '99'
        ,'countryId': countriesRows[98].id
        ,'languageId': '1'
        ,'name': 'India'
        ,
        createdAt: new Date()
      },
      {
        'id': '100'
        ,'countryId': countriesRows[99].id
        ,'languageId': '1'
        ,'name': 'Isle of Man'
        ,
        createdAt: new Date()
      },
      {
        'id': '101'
        ,'countryId': countriesRows[100].id
        ,'languageId': '1'
        ,'name': 'Indonesia'
        ,
        createdAt: new Date()
      },
      {
        'id': '102'
        ,'countryId': countriesRows[101].id
        ,'languageId': '1'
        ,'name': 'Iran (Islamic Republic of)'
        ,
        createdAt: new Date()
      },
      {
        'id': '103'
        ,'countryId': countriesRows[102].id
        ,'languageId': '1'
        ,'name': 'Iraq'
        ,
        createdAt: new Date()
      },
      {
        'id': '104'
        ,'countryId': countriesRows[103].id
        ,'languageId': '1'
        ,'name': 'Ireland'
        ,
        createdAt: new Date()
      },
      {
        'id': '105'
        ,'countryId': countriesRows[104].id
        ,'languageId': '1'
        ,'name': 'Israel'
        ,
        createdAt: new Date()
      },
      {
        'id': '106'
        ,'countryId': countriesRows[105].id
        ,'languageId': '1'
        ,'name': 'Italy'
        ,
        createdAt: new Date()
      },
      {
        'id': '107'
        ,'countryId': countriesRows[106].id
        ,'languageId': '1'
        ,'name': 'Ivory Coast'
        ,
        createdAt: new Date()
      },
      {
        'id': '108'
        ,'countryId': countriesRows[107].id
        ,'languageId': '1'
        ,'name': 'Jersey'
        ,
        createdAt: new Date()
      },
      {
        'id': '109'
        ,'countryId': countriesRows[108].id
        ,'languageId': '1'
        ,'name': 'Jamaica'
        ,
        createdAt: new Date()
      },
      {
        'id': '110'
        ,'countryId': countriesRows[109].id
        ,'languageId': '1'
        ,'name': 'Japan'
        ,
        createdAt: new Date()
      },
      {
        'id': '111'
        ,'countryId': countriesRows[110].id
        ,'languageId': '1'
        ,'name': 'Jordan'
        ,
        createdAt: new Date()
      },
      {
        'id': '112'
        ,'countryId': countriesRows[111].id
        ,'languageId': '1'
        ,'name': 'Kazakhstan'
        ,
        createdAt: new Date()
      },
      {
        'id': '113'
        ,'countryId': countriesRows[112].id
        ,'languageId': '1'
        ,'name': 'Kenya'
        ,
        createdAt: new Date()
      },
      {
        'id': '114'
        ,'countryId': countriesRows[113].id
        ,'languageId': '1'
        ,'name': 'Kiribati'
        ,
        createdAt: new Date()
      },
      {
        'id': '115'
        ,'countryId': countriesRows[114].id
        ,'languageId': '1'
        ,'name': 'Democratic Peoples Republic of Korea'
        ,
        createdAt: new Date()
      },
      {
        'id': '116'
        ,'countryId': countriesRows[115].id
        ,'languageId': '1'
        ,'name': 'Korea, Republic of'
        ,
        createdAt: new Date()
      },
      {
        'id': '117'
        ,'countryId': countriesRows[116].id
        ,'languageId': '1'
        ,'name': 'Kosovo'
        ,
        createdAt: new Date()
      },
      {
        'id': '118'
        ,'countryId': countriesRows[117].id
        ,'languageId': '1'
        ,'name': 'Kuwait'
        ,
        createdAt: new Date()
      },
      {
        'id': '119'
        ,'countryId': countriesRows[118].id
        ,'languageId': '1'
        ,'name': 'Kyrgyzstan'
        ,
        createdAt: new Date()
      },
      {
        'id': '120'
        ,'countryId': countriesRows[119].id
        ,'languageId': '1'
        ,'name': 'Lao Peoples Democratic Republic'
        ,
        createdAt: new Date()
      },
      {
        'id': '121'
        ,'countryId': countriesRows[120].id
        ,'languageId': '1'
        ,'name': 'Latvia'
        ,
        createdAt: new Date()
      },
      {
        'id': '122'
        ,'countryId': countriesRows[121].id
        ,'languageId': '1'
        ,'name': 'Lebanon'
        ,
        createdAt: new Date()
      },
      {
        'id': '123'
        ,'countryId': countriesRows[122].id
        ,'languageId': '1'
        ,'name': 'Lesotho'
        ,
        createdAt: new Date()
      },
      {
        'id': '124'
        ,'countryId': countriesRows[123].id
        ,'languageId': '1'
        ,'name': 'Liberia'
        ,
        createdAt: new Date()
      },
      {
        'id': '125'
        ,'countryId': countriesRows[124].id
        ,'languageId': '1'
        ,'name': 'Libyan Arab Jamahiriya'
        ,
        createdAt: new Date()
      },
      {
        'id': '126'
        ,'countryId': countriesRows[125].id
        ,'languageId': '1'
        ,'name': 'Liechtenstein'
        ,
        createdAt: new Date()
      },
      {
        'id': '127'
        ,'countryId': countriesRows[126].id
        ,'languageId': '1'
        ,'name': 'Lithuania'
        ,
        createdAt: new Date()
      },
      {
        'id': '128'
        ,'countryId': countriesRows[127].id
        ,'languageId': '1'
        ,'name': 'Luxembourg'
        ,
        createdAt: new Date()
      },
      {
        'id': '129'
        ,'countryId': countriesRows[128].id
        ,'languageId': '1'
        ,'name': 'Macau'
        ,
        createdAt: new Date()
      },
      {
        'id': '130'
        ,'countryId': countriesRows[129].id
        ,'languageId': '1'
        ,'name': 'Macedonia'
        ,
        createdAt: new Date()
      },
      {
        'id': '131'
        ,'countryId': countriesRows[130].id
        ,'languageId': '1'
        ,'name': 'Madagascar'
        ,
        createdAt: new Date()
      },
      {
        'id': '132'
        ,'countryId': countriesRows[131].id
        ,'languageId': '1'
        ,'name': 'Malawi'
        ,
        createdAt: new Date()
      },
      {
        'id': '133'
        ,'countryId': countriesRows[132].id
        ,'languageId': '1'
        ,'name': 'Malaysia'
        ,
        createdAt: new Date()
      },
      {
        'id': '134'
        ,'countryId': countriesRows[133].id
        ,'languageId': '1'
        ,'name': 'Maldives'
        ,
        createdAt: new Date()
      },
      {
        'id': '135'
        ,'countryId': countriesRows[134].id
        ,'languageId': '1'
        ,'name': 'Mali'
        ,
        createdAt: new Date()
      },
      {
        'id': '136'
        ,'countryId': countriesRows[135].id
        ,'languageId': '1'
        ,'name': 'Malta'
        ,
        createdAt: new Date()
      },
      {
        'id': '137'
        ,'countryId': countriesRows[136].id
        ,'languageId': '1'
        ,'name': 'Marshall Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '138'
        ,'countryId': countriesRows[137].id
        ,'languageId': '1'
        ,'name': 'Martinique'
        ,
        createdAt: new Date()
      },
      {
        'id': '139'
        ,'countryId': countriesRows[138].id
        ,'languageId': '1'
        ,'name': 'Mauritania'
        ,
        createdAt: new Date()
      },
      {
        'id': '140'
        ,'countryId': countriesRows[139].id
        ,'languageId': '1'
        ,'name': 'Mauritius'
        ,
        createdAt: new Date()
      },
      {
        'id': '141'
        ,'countryId': countriesRows[140].id
        ,'languageId': '1'
        ,'name': 'Mayotte'
        ,
        createdAt: new Date()
      },
      {
        'id': '142'
        ,'countryId': countriesRows[141].id
        ,'languageId': '1'
        ,'name': 'Mexico'
        ,
        createdAt: new Date()
      },
      {
        'id': '143'
        ,'countryId': countriesRows[142].id
        ,'languageId': '1'
        ,'name': 'Micronesia, Federated States of'
        ,
        createdAt: new Date()
      },
      {
        'id': '144'
        ,'countryId': countriesRows[143].id
        ,'languageId': '1'
        ,'name': 'Moldova, Republic of'
        ,
        createdAt: new Date()
      },
      {
        'id': '145'
        ,'countryId': countriesRows[144].id
        ,'languageId': '1'
        ,'name': 'Monaco'
        ,
        createdAt: new Date()
      },
      {
        'id': '146'
        ,'countryId': countriesRows[145].id
        ,'languageId': '1'
        ,'name': 'Mongolia'
        ,
        createdAt: new Date()
      },
      {
        'id': '147'
        ,'countryId': countriesRows[146].id
        ,'languageId': '1'
        ,'name': 'Montenegro'
        ,
        createdAt: new Date()
      },
      {
        'id': '148'
        ,'countryId': countriesRows[147].id
        ,'languageId': '1'
        ,'name': 'Montserrat'
        ,
        createdAt: new Date()
      },
      {
        'id': '149'
        ,'countryId': countriesRows[148].id
        ,'languageId': '1'
        ,'name': 'Morocco'
        ,
        createdAt: new Date()
      },
      {
        'id': '150'
        ,'countryId': countriesRows[149].id
        ,'languageId': '1'
        ,'name': 'Mozambique'
        ,
        createdAt: new Date()
      },
      {
        'id': '151'
        ,'countryId': countriesRows[150].id
        ,'languageId': '1'
        ,'name': 'Myanmar'
        ,
        createdAt: new Date()
      },
      {
        'id': '152'
        ,'countryId': countriesRows[151].id
        ,'languageId': '1'
        ,'name': 'Namibia'
        ,
        createdAt: new Date()
      },
      {
        'id': '153'
        ,'countryId': countriesRows[152].id
        ,'languageId': '1'
        ,'name': 'Nauru'
        ,
        createdAt: new Date()
      },
      {
        'id': '154'
        ,'countryId': countriesRows[153].id
        ,'languageId': '1'
        ,'name': 'Nepal'
        ,
        createdAt: new Date()
      },
      {
        'id': '155'
        ,'countryId': countriesRows[154].id
        ,'languageId': '1'
        ,'name': 'Netherlands'
        ,
        createdAt: new Date()
      },
      {
        'id': '156'
        ,'countryId': countriesRows[155].id
        ,'languageId': '1'
        ,'name': 'Netherlands Antilles'
        ,
        createdAt: new Date()
      },
      {
        'id': '157'
        ,'countryId': countriesRows[156].id
        ,'languageId': '1'
        ,'name': 'New Caledonia'
        ,
        createdAt: new Date()
      },
      {
        'id': '158'
        ,'countryId': countriesRows[157].id
        ,'languageId': '1'
        ,'name': 'New Zealand'
        ,
        createdAt: new Date()
      },
      {
        'id': '159'
        ,'countryId': countriesRows[158].id
        ,'languageId': '1'
        ,'name': 'Nicaragua'
        ,
        createdAt: new Date()
      },
      {
        'id': '160'
        ,'countryId': countriesRows[159].id
        ,'languageId': '1'
        ,'name': 'Niger'
        ,
        createdAt: new Date()
      },
      {
        'id': '161'
        ,'countryId': countriesRows[160].id
        ,'languageId': '1'
        ,'name': 'Nigeria'
        ,
        createdAt: new Date()
      },
      {
        'id': '162'
        ,'countryId': countriesRows[161].id
        ,'languageId': '1'
        ,'name': 'Niue'
        ,
        createdAt: new Date()
      },
      {
        'id': '163'
        ,'countryId': countriesRows[162].id
        ,'languageId': '1'
        ,'name': 'Norfolk Island'
        ,
        createdAt: new Date()
      },
      {
        'id': '164'
        ,'countryId': countriesRows[163].id
        ,'languageId': '1'
        ,'name': 'Northern Mariana Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '165'
        ,'countryId': countriesRows[164].id
        ,'languageId': '1'
        ,'name': 'Norway'
        ,
        createdAt: new Date()
      },
      {
        'id': '166'
        ,'countryId': countriesRows[165].id
        ,'languageId': '1'
        ,'name': 'Oman'
        ,
        createdAt: new Date()
      },
      {
        'id': '167'
        ,'countryId': countriesRows[166].id
        ,'languageId': '1'
        ,'name': 'Pakistan'
        ,
        createdAt: new Date()
      },
      {
        'id': '168'
        ,'countryId': countriesRows[167].id
        ,'languageId': '1'
        ,'name': 'Palau'
        ,
        createdAt: new Date()
      },
      {
        'id': '169'
        ,'countryId': countriesRows[168].id
        ,'languageId': '1'
        ,'name': 'Palestine'
        ,
        createdAt: new Date()
      },
      {
        'id': '170'
        ,'countryId': countriesRows[169].id
        ,'languageId': '1'
        ,'name': 'Panama'
        ,
        createdAt: new Date()
      },
      {
        'id': '171'
        ,'countryId': countriesRows[170].id
        ,'languageId': '1'
        ,'name': 'Papua New Guinea'
        ,
        createdAt: new Date()
      },
      {
        'id': '172'
        ,'countryId': countriesRows[171].id
        ,'languageId': '1'
        ,'name': 'Paraguay'
        ,
        createdAt: new Date()
      },
      {
        'id': '173'
        ,'countryId': countriesRows[172].id
        ,'languageId': '1'
        ,'name': 'Peru'
        ,
        createdAt: new Date()
      },
      {
        'id': '174'
        ,'countryId': countriesRows[173].id
        ,'languageId': '1'
        ,'name': 'Philippines'
        ,
        createdAt: new Date()
      },
      {
        'id': '175'
        ,'countryId': countriesRows[174].id
        ,'languageId': '1'
        ,'name': 'Pitcairn'
        ,
        createdAt: new Date()
      },
      {
        'id': '176'
        ,'countryId': countriesRows[175].id
        ,'languageId': '1'
        ,'name': 'Poland'
        ,
        createdAt: new Date()
      },
      {
        'id': '177'
        ,'countryId': countriesRows[176].id
        ,'languageId': '1'
        ,'name': 'Portugal'
        ,
        createdAt: new Date()
      },
      {
        'id': '178'
        ,'countryId': countriesRows[177].id
        ,'languageId': '1'
        ,'name': 'Puerto Rico'
        ,
        createdAt: new Date()
      },
      {
        'id': '179'
        ,'countryId': countriesRows[178].id
        ,'languageId': '1'
        ,'name': 'Qatar'
        ,
        createdAt: new Date()
      },
      {
        'id': '180'
        ,'countryId': countriesRows[179].id
        ,'languageId': '1'
        ,'name': 'Reunion'
        ,
        createdAt: new Date()
      },
      {
        'id': '181'
        ,'countryId': countriesRows[180].id
        ,'languageId': '1'
        ,'name': 'Romania'
        ,
        createdAt: new Date()
      },
      {
        'id': '182'
        ,'countryId': countriesRows[181].id
        ,'languageId': '1'
        ,'name': 'Russian Federation'
        ,
        createdAt: new Date()
      },
      {
        'id': '183'
        ,'countryId': countriesRows[182].id
        ,'languageId': '1'
        ,'name': 'Rwanda'
        ,
        createdAt: new Date()
      },
      {
        'id': '184'
        ,'countryId': countriesRows[183].id
        ,'languageId': '1'
        ,'name': 'Saint Kitts and Nevis'
        ,
        createdAt: new Date()
      },
      {
        'id': '185'
        ,'countryId': countriesRows[184].id
        ,'languageId': '1'
        ,'name': 'Saint Lucia'
        ,
        createdAt: new Date()
      },
      {
        'id': '186'
        ,'countryId': countriesRows[185].id
        ,'languageId': '1'
        ,'name': 'Saint Vincent and the Grenadines'
        ,
        createdAt: new Date()
      },
      {
        'id': '187'
        ,'countryId': countriesRows[186].id
        ,'languageId': '1'
        ,'name': 'Samoa'
        ,
        createdAt: new Date()
      },
      {
        'id': '188'
        ,'countryId': countriesRows[187].id
        ,'languageId': '1'
        ,'name': 'San Marino'
        ,
        createdAt: new Date()
      },
      {
        'id': '189'
        ,'countryId': countriesRows[188].id
        ,'languageId': '1'
        ,'name': 'Sao Tome and Principe'
        ,
        createdAt: new Date()
      },
      {
        'id': '190'
        ,'countryId': countriesRows[189].id
        ,'languageId': '1'
        ,'name': 'Saudi Arabia'
        ,
        createdAt: new Date()
      },
      {
        'id': '191'
        ,'countryId': countriesRows[190].id
        ,'languageId': '1'
        ,'name': 'Senegal'
        ,
        createdAt: new Date()
      },
      {
        'id': '192'
        ,'countryId': countriesRows[191].id
        ,'languageId': '1'
        ,'name': 'Serbia'
        ,
        createdAt: new Date()
      },
      {
        'id': '193'
        ,'countryId': countriesRows[192].id
        ,'languageId': '1'
        ,'name': 'Seychelles'
        ,
        createdAt: new Date()
      },
      {
        'id': '194'
        ,'countryId': countriesRows[193].id
        ,'languageId': '1'
        ,'name': 'Sierra Leone'
        ,
        createdAt: new Date()
      },
      {
        'id': '195'
        ,'countryId': countriesRows[194].id
        ,'languageId': '1'
        ,'name': 'Singapore'
        ,
        createdAt: new Date()
      },
      {
        'id': '196'
        ,'countryId': countriesRows[195].id
        ,'languageId': '1'
        ,'name': 'Slovakia'
        ,
        createdAt: new Date()
      },
      {
        'id': '197'
        ,'countryId': countriesRows[196].id
        ,'languageId': '1'
        ,'name': 'Slovenia'
        ,
        createdAt: new Date()
      },
      {
        'id': '198'
        ,'countryId': countriesRows[197].id
        ,'languageId': '1'
        ,'name': 'Solomon Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '199'
        ,'countryId': countriesRows[198].id
        ,'languageId': '1'
        ,'name': 'Somalia'
        ,
        createdAt: new Date()
      },
      {
        'id': '200'
        ,'countryId': countriesRows[199].id
        ,'languageId': '1'
        ,'name': 'South Africa'
        ,
        createdAt: new Date()
      },
      {
        'id': '201'
        ,'countryId': countriesRows[200].id
        ,'languageId': '1'
        ,'name': 'South Georgia South Sandwich Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '202'
        ,'countryId': countriesRows[201].id
        ,'languageId': '1'
        ,'name': 'South Sudan'
        ,
        createdAt: new Date()
      },
      {
        'id': '203'
        ,'countryId': countriesRows[202].id
        ,'languageId': '1'
        ,'name': 'Spain'
        ,
        createdAt: new Date()
      },
      {
        'id': '204'
        ,'countryId': countriesRows[203].id
        ,'languageId': '1'
        ,'name': 'Sri Lanka'
        ,
        createdAt: new Date()
      },
      {
        'id': '205'
        ,'countryId': countriesRows[204].id
        ,'languageId': '1'
        ,'name': 'St. Helena'
        ,
        createdAt: new Date()
      },
      {
        'id': '206'
        ,'countryId': countriesRows[205].id
        ,'languageId': '1'
        ,'name': 'St. Pierre and Miquelon'
        ,
        createdAt: new Date()
      },
      {
        'id': '207'
        ,'countryId': countriesRows[206].id
        ,'languageId': '1'
        ,'name': 'Sudan'
        ,
        createdAt: new Date()
      },
      {
        'id': '208'
        ,'countryId': countriesRows[207].id
        ,'languageId': '1'
        ,'name': 'Suriname'
        ,
        createdAt: new Date()
      },
      {
        'id': '209'
        ,'countryId': countriesRows[208].id
        ,'languageId': '1'
        ,'name': 'Svalbard and Jan Mayen Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '210'
        ,'countryId': countriesRows[209].id
        ,'languageId': '1'
        ,'name': 'Swaziland'
        ,
        createdAt: new Date()
      },
      {
        'id': '211'
        ,'countryId': countriesRows[210].id
        ,'languageId': '1'
        ,'name': 'Sweden'
        ,
        createdAt: new Date()
      },
      {
        'id': '212'
        ,'countryId': countriesRows[211].id
        ,'languageId': '1'
        ,'name': 'Switzerland'
        ,
        createdAt: new Date()
      },
      {
        'id': '213'
        ,'countryId': countriesRows[212].id
        ,'languageId': '1'
        ,'name': 'Syrian Arab Republic'
        ,
        createdAt: new Date()
      },
      {
        'id': '214'
        ,'countryId': countriesRows[213].id
        ,'languageId': '1'
        ,'name': 'Taiwan'
        ,
        createdAt: new Date()
      },
      {
        'id': '215'
        ,'countryId': countriesRows[214].id
        ,'languageId': '1'
        ,'name': 'Tajikistan'
        ,
        createdAt: new Date()
      },
      {
        'id': '216'
        ,'countryId': countriesRows[215].id
        ,'languageId': '1'
        ,'name': 'Tanzania, United Republic of'
        ,
        createdAt: new Date()
      },
      {
        'id': '217'
        ,'countryId': countriesRows[216].id
        ,'languageId': '1'
        ,'name': 'Thailand'
        ,
        createdAt: new Date()
      },
      {
        'id': '218'
        ,'countryId': countriesRows[217].id
        ,'languageId': '1'
        ,'name': 'Togo'
        ,
        createdAt: new Date()
      },
      {
        'id': '219'
        ,'countryId': countriesRows[218].id
        ,'languageId': '1'
        ,'name': 'Tokelau'
        ,
        createdAt: new Date()
      },
      {
        'id': '220'
        ,'countryId': countriesRows[219].id
        ,'languageId': '1'
        ,'name': 'Tonga'
        ,
        createdAt: new Date()
      },
      {
        'id': '221'
        ,'countryId': countriesRows[220].id
        ,'languageId': '1'
        ,'name': 'Trinidad and Tobago'
        ,
        createdAt: new Date()
      },
      {
        'id': '222'
        ,'countryId': countriesRows[221].id
        ,'languageId': '1'
        ,'name': 'Tunisia'
        ,
        createdAt: new Date()
      },
      {
        'id': '223'
        ,'countryId': countriesRows[222].id
        ,'languageId': '1'
        ,'name': 'Turkey'
        ,
        createdAt: new Date()
      },
      {
        'id': '224'
        ,'countryId': countriesRows[223].id
        ,'languageId': '1'
        ,'name': 'Turkmenistan'
        ,
        createdAt: new Date()
      },
      {
        'id': '225'
        ,'countryId': countriesRows[224].id
        ,'languageId': '1'
        ,'name': 'Turks and Caicos Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '226'
        ,'countryId': countriesRows[225].id
        ,'languageId': '1'
        ,'name': 'Tuvalu'
        ,
        createdAt: new Date()
      },
      {
        'id': '227'
        ,'countryId': countriesRows[226].id
        ,'languageId': '1'
        ,'name': 'Uganda'
        ,
        createdAt: new Date()
      },
      {
        'id': '228'
        ,'countryId': countriesRows[227].id
        ,'languageId': '1'
        ,'name': 'Ukraine'
        ,
        createdAt: new Date()
      },
      {
        'id': '229'
        ,'countryId': countriesRows[228].id
        ,'languageId': '1'
        ,'name': 'United Arab Emirates'
        ,
        createdAt: new Date()
      },
      {
        'id': '230'
        ,'countryId': countriesRows[229].id
        ,'languageId': '1'
        ,'name': 'United Kingdom'
        ,
        createdAt: new Date()
      },
      {
        'id': '231'
        ,'countryId': countriesRows[230].id
        ,'languageId': '1'
        ,'name': 'United States'
        ,
        createdAt: new Date()
      },
      {
        'id': '232'
        ,'countryId': countriesRows[231].id
        ,'languageId': '1'
        ,'name': 'United States minor outlying islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '233'
        ,'countryId': countriesRows[232].id
        ,'languageId': '1'
        ,'name': 'Uruguay'
        ,
        createdAt: new Date()
      },
      {
        'id': '234'
        ,'countryId': countriesRows[233].id
        ,'languageId': '1'
        ,'name': 'Uzbekistan'
        ,
        createdAt: new Date()
      },
      {
        'id': '235'
        ,'countryId': countriesRows[234].id
        ,'languageId': '1'
        ,'name': 'Vanuatu'
        ,
        createdAt: new Date()
      },
      {
        'id': '236'
        ,'countryId': countriesRows[235].id
        ,'languageId': '1'
        ,'name': 'Vatican City State'
        ,
        createdAt: new Date()
      },
      {
        'id': '237'
        ,'countryId': countriesRows[236].id
        ,'languageId': '1'
        ,'name': 'Venezuela'
        ,
        createdAt: new Date()
      },
      {
        'id': '238'
        ,'countryId': countriesRows[237].id
        ,'languageId': '1'
        ,'name': 'Vietnam'
        ,
        createdAt: new Date()
      },
      {
        'id': '239'
        ,'countryId': countriesRows[238].id
        ,'languageId': '1'
        ,'name': 'Virgin Islands (British)'
        ,
        createdAt: new Date()
      },
      {
        'id': '240'
        ,'countryId': countriesRows[239].id
        ,'languageId': '1'
        ,'name': 'Virgin Islands (U.S.)'
        ,
        createdAt: new Date()
      },
      {
        'id': '241'
        ,'countryId': countriesRows[240].id
        ,'languageId': '1'
        ,'name': 'Wallis and Futuna Islands'
        ,
        createdAt: new Date()
      },
      {
        'id': '242'
        ,'countryId': countriesRows[241].id
        ,'languageId': '1'
        ,'name': 'Western Sahara'
        ,
        createdAt: new Date()
      },
      {
        'id': '243'
        ,'countryId': countriesRows[242].id
        ,'languageId': '1'
        ,'name': 'Yemen'
        ,
        createdAt: new Date()
      },
      {
        'id': '244'
        ,'countryId': countriesRows[243].id
        ,'languageId': '1'
        ,'name': 'Zaire'
        ,
        createdAt: new Date()
      },
      {
        'id': '245'
        ,'countryId': countriesRows[244].id
        ,'languageId': '1'
        ,'name': 'Zambia'
        ,
        createdAt: new Date()
      },
      {
        'id': '246',
        'countryId': countriesRows[245].id,
        'languageId': '1',
        'name': 'Zimbabwe',
        createdAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('countries', null, {});
    queryInterface.bulkDelete('countriesTranslation', null, {});
  }
}
;
