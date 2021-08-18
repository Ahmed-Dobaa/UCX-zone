'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('currencies', [
    {
      'id': 1,
      'code': 'AFN',
      'value': 'Afghan Afghani',
      createdAt: new Date()
    },
    {
      'id': 2,
      'code': 'AFA',
      'value': 'Afghan Afghani (1927–2002)',
      createdAt: new Date()
    },
    {
      'id': 3,
      'code': 'ALL',
      'value': 'Albanian Lek',
      createdAt: new Date()
    },
    {
      'id': 4,
      'code': 'ALK',
      'value': 'Albanian Lek (1946–1965)',
      createdAt: new Date()
    },
    {
      'id': 5,
      'code': 'DZD',
      'value': 'Algerian Dinar',
      createdAt: new Date()
    },
    {
      'id': 6,
      'code': 'ADP',
      'value': 'Andorran Peseta',
      createdAt: new Date()
    },
    {
      'id': 7,
      'code': 'AOA',
      'value': 'Angolan Kwanza',
      createdAt: new Date()
    },
    {
      'id': 8,
      'code': 'AOK',
      'value': 'Angolan Kwanza (1977–1991)',
      createdAt: new Date()
    },
    {
      'id': 9,
      'code': 'AON',
      'value': 'Angolan New Kwanza (1990–2000)',
      createdAt: new Date()
    },
    {
      'id': 10,
      'code': 'AOR',
      'value': 'Angolan Readjusted Kwanza (1995–1999)',
      createdAt: new Date()
    },
    {
      'id': 11,
      'code': 'ARA',
      'value': 'Argentine Austral',
      createdAt: new Date()
    },
    {
      'id': 12,
      'code': 'ARS',
      'value': 'Argentine Peso',
      createdAt: new Date()
    },
    {
      'id': 13,
      'code': 'ARM',
      'value': 'Argentine Peso (1881–1970)',
      createdAt: new Date()
    },
    {
      'id': 14,
      'code': 'ARP',
      'value': 'Argentine Peso (1983–1985)',
      createdAt: new Date()
    },
    {
      'id': 15,
      'code': 'ARL',
      'value': 'Argentine Peso Ley (1970–1983)',
      createdAt: new Date()
    },
    {
      'id': 16,
      'code': 'AMD',
      'value': 'Armenian Dram',
      createdAt: new Date()
    },
    {
      'id': 17,
      'code': 'AWG',
      'value': 'Aruban Florin'
      ,
      createdAt: new Date()
    },
    {
      'id': 18,
      'code': 'AUD',
      'value': 'Australian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 19,
      'code': 'ATS',
      'value': 'Austrian Schilling'
      ,
      createdAt: new Date()
    },
    {
      'id': 20,
      'code': 'AZN',
      'value': 'Azerbaijani Manat'
      ,
      createdAt: new Date()
    },
    {
      'id': 21,
      'code': 'AZM',
      'value': 'Azerbaijani Manat (1993–2006)'
      ,
      createdAt: new Date()
    },
    {
      'id': 22,
      'code': 'BSD',
      'value': 'Bahamian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 23,
      'code': 'BHD',
      'value': 'Bahraini Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 24,
      'code': 'BDT',
      'value': 'Bangladeshi Taka'
      ,
      createdAt: new Date()
    },
    {
      'id': 25,
      'code': 'BBD',
      'value': 'Barbadian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 26,
      'code': 'BYN',
      'value': 'Belarusian Ruble'
      ,
      createdAt: new Date()
    },
    {
      'id': 27,
      'code': 'BYB',
      'value': 'Belarusian Ruble (1994–1999)'
      ,
      createdAt: new Date()
    },
    {
      'id': 28,
      'code': 'BYR',
      'value': 'Belarusian Ruble (2000–2016)'
      ,
      createdAt: new Date()
    },
    {
      'id': 29,
      'code': 'BEF',
      'value': 'Belgian Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 30,
      'code': 'BEC',
      'value': 'Belgian Franc (convertible)'
      ,
      createdAt: new Date()
    },
    {
      'id': 31,
      'code': 'BEL',
      'value': 'Belgian Franc (financial)'
      ,
      createdAt: new Date()
    },
    {
      'id': 32,
      'code': 'BZD',
      'value': 'Belize Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 33,
      'code': 'BMD',
      'value': 'Bermudan Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 34,
      'code': 'BTN',
      'value': 'Bhutanese Ngultrum'
      ,
      createdAt: new Date()
    },
    {
      'id': 35,
      'code': 'BOB',
      'value': 'Bolivian Boliviano'
      ,
      createdAt: new Date()
    },
    {
      'id': 36,
      'code': 'BOL',
      'value': 'Bolivian Boliviano (1863–1963)'
      ,
      createdAt: new Date()
    },
    {
      'id': 37,
      'code': 'BOV',
      'value': 'Bolivian Mvdol'
      ,
      createdAt: new Date()
    },
    {
      'id': 38,
      'code': 'BOP',
      'value': 'Bolivian Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 39,
      'code': 'BAM',
      'value': 'Bosnia-Herzegovina Convertible Mark'
      ,
      createdAt: new Date()
    },
    {
      'id': 40,
      'code': 'BAD',
      'value': 'Bosnia-Herzegovina Dinar (1992–1994)'
      ,
      createdAt: new Date()
    },
    {
      'id': 41,
      'code': 'BAN',
      'value': 'Bosnia-Herzegovina New Dinar (1994–1997)'
      ,
      createdAt: new Date()
    },
    {
      'id': 42,
      'code': 'BWP',
      'value': 'Botswanan Pula'
      ,
      createdAt: new Date()
    },
    {
      'id': 43,
      'code': 'BRC',
      'value': 'Brazilian Cruzado (1986–1989)'
      ,
      createdAt: new Date()
    },
    {
      'id': 44,
      'code': 'BRZ',
      'value': 'Brazilian Cruzeiro (1942–1967)'
      ,
      createdAt: new Date()
    },
    {
      'id': 45,
      'code': 'BRE',
      'value': 'Brazilian Cruzeiro (1990–1993)'
      ,
      createdAt: new Date()
    },
    {
      'id': 46,
      'code': 'BRR',
      'value': 'Brazilian Cruzeiro (1993–1994)'
      ,
      createdAt: new Date()
    },
    {
      'id': 47,
      'code': 'BRN',
      'value': 'Brazilian New Cruzado (1989–1990)'
      ,
      createdAt: new Date()
    },
    {
      'id': 48,
      'code': 'BRB',
      'value': 'Brazilian New Cruzeiro (1967–1986)'
      ,
      createdAt: new Date()
    },
    {
      'id': 49,
      'code': 'BRL',
      'value': 'Brazilian Real'
      ,
      createdAt: new Date()
    },
    {
      'id': 50,
      'code': 'GBP',
      'value': 'British Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 51,
      'code': 'BND',
      'value': 'Brunei Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 52,
      'code': 'BGL',
      'value': 'Bulgarian Hard Lev'
      ,
      createdAt: new Date()
    },
    {
      'id': 53,
      'code': 'BGN',
      'value': 'Bulgarian Lev'
      ,
      createdAt: new Date()
    },
    {
      'id': 54,
      'code': 'BGO',
      'value': 'Bulgarian Lev (1879–1952)'
      ,
      createdAt: new Date()
    },
    {
      'id': 55,
      'code': 'BGM',
      'value': 'Bulgarian Sociacurrency Lev'
      ,
      createdAt: new Date()
    },
    {
      'id': 56,
      'code': 'BUK',
      'value': 'Burmese Kyat'
      ,
      createdAt: new Date()
    },
    {
      'id': 57,
      'code': 'BIF',
      'value': 'Burundian Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 58,
      'code': 'XPF',
      'value': 'CFP Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 59,
      'code': 'KHR',
      'value': 'Cambodian Riel'
      ,
      createdAt: new Date()
    },
    {
      'id': 60,
      'code': 'CAD',
      'value': 'Canadian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 61,
      'code': 'CVE',
      'value': 'Cape Verdean Escudo'
      ,
      createdAt: new Date()
    },
    {
      'id': 62,
      'code': 'KYD',
      'value': 'Cayman Islands Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 63,
      'code': 'XAF',
      'value': 'Central African CFA Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 64,
      'code': 'CLE',
      'value': 'Chilean Escudo'
      ,
      createdAt: new Date()
    },
    {
      'id': 65,
      'code': 'CLP',
      'value': 'Chilean Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 66,
      'code': 'CLF',
      'value': 'Chilean Unit of Account (UF)'
      ,
      createdAt: new Date()
    },
    {
      'id': 67,
      'code': 'CNX',
      'value': 'Chinese People’s Bank Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 68,
      'code': 'CNY',
      'value': 'Chinese Yuan'
      ,
      createdAt: new Date()
    },
    {
      'id': 69,
      'code': 'COP',
      'value': 'Colombian Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 70,
      'code': 'COU',
      'value': 'Colombian Real Value Unit'
      ,
      createdAt: new Date()
    },
    {
      'id': 71,
      'code': 'KMF',
      'value': 'Comorian Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 72,
      'code': 'CDF',
      'value': 'Congolese Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 73,
      'code': 'CRC',
      'value': 'Costa Rican Colón'
      ,
      createdAt: new Date()
    },
    {
      'id': 74,
      'code': 'HRD',
      'value': 'Croatian Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 75,
      'code': 'HRK',
      'value': 'Croatian Kuna'
      ,
      createdAt: new Date()
    },
    {
      'id': 76,
      'code': 'CUC',
      'value': 'Cuban Convertible Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 77,
      'code': 'CUP',
      'value': 'Cuban Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 78,
      'code': 'CYP',
      'value': 'Cypriot Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 79,
      'code': 'CZK',
      'value': 'Czech Koruna'
      ,
      createdAt: new Date()
    },
    {
      'id': 80,
      'code': 'CSK',
      'value': 'Czechoslovak Hard Koruna'
      ,
      createdAt: new Date()
    },
    {
      'id': 81,
      'code': 'DKK',
      'value': 'Danish Krone'
      ,
      createdAt: new Date()
    },
    {
      'id': 82,
      'code': 'DJF',
      'value': 'Djiboutian Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 83,
      'code': 'DOP',
      'value': 'Dominican Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 84,
      'code': 'NLG',
      'value': 'Dutch Guilder'
      ,
      createdAt: new Date()
    },
    {
      'id': 85,
      'code': 'XCD',
      'value': 'East Caribbean Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 86,
      'code': 'DDM',
      'value': 'East German Mark'
      ,
      createdAt: new Date()
    },
    {
      'id': 87,
      'code': 'ECS',
      'value': 'Ecuadorian Sucre'
      ,
      createdAt: new Date()
    },
    {
      'id': 88,
      'code': 'ECV',
      'value': 'Ecuadorian Unit of Constant Value'
      ,
      createdAt: new Date()
    },
    {
      'id': 89,
      'code': 'EGP',
      'value': 'Egyptian Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 90,
      'code': 'GQE',
      'value': 'Equatorial Guinean Ekwele'
      ,
      createdAt: new Date()
    },
    {
      'id': 91,
      'code': 'ERN',
      'value': 'Eritrean Nakfa'
      ,
      createdAt: new Date()
    },
    {
      'id': 92,
      'code': 'EEK',
      'value': 'Estonian Kroon'
      ,
      createdAt: new Date()
    },
    {
      'id': 93,
      'code': 'ETB',
      'value': 'Ethiopian Birr'
      ,
      createdAt: new Date()
    },
    {
      'id': 94,
      'code': 'EUR',
      'value': 'Euro'
      ,
      createdAt: new Date()
    },
    {
      'id': 95,
      'code': 'XEU',
      'value': 'European Currency Unit'
      ,
      createdAt: new Date()
    },
    {
      'id': 96,
      'code': 'FKP',
      'value': 'Falkland Islands Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 97,
      'code': 'FJD',
      'value': 'Fijian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 98,
      'code': 'FIM',
      'value': 'Finnish Markka'
      ,
      createdAt: new Date()
    },
    {
      'id': 99,
      'code': 'FRF',
      'value': 'French Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 100,
      'code': 'XFO',
      'value': 'French Gold Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 101,
      'code': 'XFU',
      'value': 'French UIC-Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 102,
      'code': 'GMD',
      'value': 'Gambian Dalasi'
      ,
      createdAt: new Date()
    },
    {
      'id': 103,
      'code': 'GEK',
      'value': 'Georgian Kupon Larit'
      ,
      createdAt: new Date()
    },
    {
      'id': 104,
      'code': 'GEL',
      'value': 'Georgian Lari'
      ,
      createdAt: new Date()
    },
    {
      'id': 105,
      'code': 'DEM',
      'value': 'German Mark'
      ,
      createdAt: new Date()
    },
    {
      'id': 106,
      'code': 'GHS',
      'value': 'Ghanaian Cedi'
      ,
      createdAt: new Date()
    },
    {
      'id': 107,
      'code': 'GHC',
      'value': 'Ghanaian Cedi (1979–2007)'
      ,
      createdAt: new Date()
    },
    {
      'id': 108,
      'code': 'GIP',
      'value': 'Gibraltar Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 109,
      'code': 'GRD',
      'value': 'Greek Drachma'
      ,
      createdAt: new Date()
    },
    {
      'id': 110,
      'code': 'GTQ',
      'value': 'Guatemalan Quetzal'
      ,
      createdAt: new Date()
    },
    {
      'id': 111,
      'code': 'GWP',
      'value': 'Guinea-Bissau Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 112,
      'code': 'GNF',
      'value': 'Guinean Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 113,
      'code': 'GNS',
      'value': 'Guinean Syli'
      ,
      createdAt: new Date()
    },
    {
      'id': 114,
      'code': 'GYD',
      'value': 'Guyanaese Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 115,
      'code': 'HTG',
      'value': 'Haitian Gourde'
      ,
      createdAt: new Date()
    },
    {
      'id': 116,
      'code': 'HNL',
      'value': 'Honduran Lempira'
      ,
      createdAt: new Date()
    },
    {
      'id': 117,
      'code': 'HKD',
      'value': 'Hong Kong Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 118,
      'code': 'HUF',
      'value': 'Hungarian Forint'
      ,
      createdAt: new Date()
    },
    {
      'id': 119,
      'code': 'ISK',
      'value': 'Icelandic Króna'
      ,
      createdAt: new Date()
    },
    {
      'id': 120,
      'code': 'ISJ',
      'value': 'Icelandic Króna (1918–1981)'
      ,
      createdAt: new Date()
    },
    {
      'id': 121,
      'code': 'INR',
      'value': 'Indian Rupee'
      ,
      createdAt: new Date()
    },
    {
      'id': 122,
      'code': 'codeR',
      'value': 'Indonesian Rupiah'
      ,
      createdAt: new Date()
    },
    {
      'id': 123,
      'code': 'IRR',
      'value': 'Iranian Rial'
      ,
      createdAt: new Date()
    },
    {
      'id': 124,
      'code': 'IQD',
      'value': 'Iraqi Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 125,
      'code': 'IEP',
      'value': 'Irish Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 126,
      'code': 'ILS',
      'value': 'Israeli New Shekel'
      ,
      createdAt: new Date()
    },
    {
      'id': 127,
      'code': 'ILP',
      'value': 'Israeli Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 128,
      'code': 'ILR',
      'value': 'Israeli Shekel (1980–1985)'
      ,
      createdAt: new Date()
    },
    {
      'id': 129,
      'code': 'ITL',
      'value': 'Italian Lira'
      ,
      createdAt: new Date()
    },
    {
      'id': 130,
      'code': 'JMD',
      'value': 'Jamaican Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 131,
      'code': 'JPY',
      'value': 'Japanese Yen'
      ,
      createdAt: new Date()
    },
    {
      'id': 132,
      'code': 'JOD',
      'value': 'Jordanian Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 133,
      'code': 'KZT',
      'value': 'Kazakhstani Tenge'
      ,
      createdAt: new Date()
    },
    {
      'id': 134,
      'code': 'KES',
      'value': 'Kenyan Shilling'
      ,
      createdAt: new Date()
    },
    {
      'id': 135,
      'code': 'KWD',
      'value': 'Kuwaiti Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 136,
      'code': 'KGS',
      'value': 'Kyrgystani Som'
      ,
      createdAt: new Date()
    },
    {
      'id': 137,
      'code': 'LAK',
      'value': 'Laotian Kip'
      ,
      createdAt: new Date()
    },
    {
      'id': 138,
      'code': 'LVL',
      'value': 'Latvian Lats'
      ,
      createdAt: new Date()
    },
    {
      'id': 139,
      'code': 'LVR',
      'value': 'Latvian Ruble'
      ,
      createdAt: new Date()
    },
    {
      'id': 140,
      'code': 'LBP',
      'value': 'Lebanese Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 141,
      'code': 'LSL',
      'value': 'Lesotho Loti'
      ,
      createdAt: new Date()
    },
    {
      'id': 142,
      'code': 'LRD',
      'value': 'Liberian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 143,
      'code': 'LYD',
      'value': 'Libyan Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 144,
      'code': 'LTL',
      'value': 'Lithuanian Litas'
      ,
      createdAt: new Date()
    },
    {
      'id': 145,
      'code': 'LTT',
      'value': 'Lithuanian Talonas'
      ,
      createdAt: new Date()
    },
    {
      'id': 146,
      'code': 'LUL',
      'value': 'Luxembourg Financial Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 147,
      'code': 'LUC',
      'value': 'Luxembourgian Convertible Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 148,
      'code': 'LUF',
      'value': 'Luxembourgian Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 149,
      'code': 'MOP',
      'value': 'Macanese Pataca'
      ,
      createdAt: new Date()
    },
    {
      'id': 150,
      'code': 'MKD',
      'value': 'Macedonian Denar'
      ,
      createdAt: new Date()
    },
    {
      'id': 151,
      'code': 'MKN',
      'value': 'Macedonian Denar (1992–1993)'
      ,
      createdAt: new Date()
    },
    {
      'id': 152,
      'code': 'MGA',
      'value': 'Malagasy Ariary'
      ,
      createdAt: new Date()
    },
    {
      'id': 153,
      'code': 'MGF',
      'value': 'Malagasy Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 154,
      'code': 'MWK',
      'value': 'Malawian Kwacha'
      ,
      createdAt: new Date()
    },
    {
      'id': 155,
      'code': 'MYR',
      'value': 'Malaysian Ringgit'
      ,
      createdAt: new Date()
    },
    {
      'id': 156,
      'code': 'MVR',
      'value': 'Maldivian Rufiyaa'
      ,
      createdAt: new Date()
    },
    {
      'id': 157,
      'code': 'MVP',
      'value': 'Maldivian Rupee (1947–1981)'
      ,
      createdAt: new Date()
    },
    {
      'id': 158,
      'code': 'MLF',
      'value': 'Malian Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 159,
      'code': 'MTL',
      'value': 'Maltese Lira'
      ,
      createdAt: new Date()
    },
    {
      'id': 160,
      'code': 'MTP',
      'value': 'Maltese Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 161,
      'code': 'MRO',
      'value': 'Mauritanian Ouguiya'
      ,
      createdAt: new Date()
    },
    {
      'id': 162,
      'code': 'MUR',
      'value': 'Mauritian Rupee'
      ,
      createdAt: new Date()
    },
    {
      'id': 163,
      'code': 'MXV',
      'value': 'Mexican Investment Unit'
      ,
      createdAt: new Date()
    },
    {
      'id': 164,
      'code': 'MXN',
      'value': 'Mexican Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 165,
      'code': 'MXP',
      'value': 'Mexican Silver Peso (1861–1992)'
      ,
      createdAt: new Date()
    },
    {
      'id': 166,
      'code': 'MDC',
      'value': 'Moldovan Cupon'
      ,
      createdAt: new Date()
    },
    {
      'id': 167,
      'code': 'MDL',
      'value': 'Moldovan Leu'
      ,
      createdAt: new Date()
    },
    {
      'id': 168,
      'code': 'MCF',
      'value': 'Monegasque Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 169,
      'code': 'MNT',
      'value': 'Mongolian Tugrik'
      ,
      createdAt: new Date()
    },
    {
      'id': 170,
      'code': 'MAD',
      'value': 'Moroccan Dirham'
      ,
      createdAt: new Date()
    },
    {
      'id': 171,
      'code': 'MAF',
      'value': 'Moroccan Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 172,
      'code': 'MZE',
      'value': 'Mozambican Escudo'
      ,
      createdAt: new Date()
    },
    {
      'id': 173,
      'code': 'MZN',
      'value': 'Mozambican Metical'
      ,
      createdAt: new Date()
    },
    {
      'id': 174,
      'code': 'MZM',
      'value': 'Mozambican Metical (1980–2006)'
      ,
      createdAt: new Date()
    },
    {
      'id': 175,
      'code': 'MMK',
      'value': 'Myanmar Kyat'
      ,
      createdAt: new Date()
    },
    {
      'id': 176,
      'code': 'NAD',
      'value': 'Namibian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 177,
      'code': 'NPR',
      'value': 'Nepalese Rupee'
      ,
      createdAt: new Date()
    },
    {
      'id': 178,
      'code': 'ANG',
      'value': 'Netherlands Antillean Guilder'
      ,
      createdAt: new Date()
    },
    {
      'id': 179,
      'code': 'TWD',
      'value': 'New Taiwan Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 180,
      'code': 'NZD',
      'value': 'New Zealand Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 181,
      'code': 'NIO',
      'value': 'Nicaraguan Córdoba'
      ,
      createdAt: new Date()
    },
    {
      'id': 182,
      'code': 'NIC',
      'value': 'Nicaraguan Córdoba (1988–1991)'
      ,
      createdAt: new Date()
    },
    {
      'id': 183,
      'code': 'NGN',
      'value': 'Nigerian Naira'
      ,
      createdAt: new Date()
    },
    {
      'id': 184,
      'code': 'KPW',
      'value': 'North Korean Won'
      ,
      createdAt: new Date()
    },
    {
      'id': 185,
      'code': 'NOK',
      'value': 'Norwegian Krone'
      ,
      createdAt: new Date()
    },
    {
      'id': 186,
      'code': 'OMR',
      'value': 'Omani Rial'
      ,
      createdAt: new Date()
    },
    {
      'id': 187,
      'code': 'PKR',
      'value': 'Pakistani Rupee'
      ,
      createdAt: new Date()
    },
    {
      'id': 188,
      'code': 'PAB',
      'value': 'Panamanian Balboa'
      ,
      createdAt: new Date()
    },
    {
      'id': 189,
      'code': 'PGK',
      'value': 'Papua New Guinean Kina'
      ,
      createdAt: new Date()
    },
    {
      'id': 190,
      'code': 'PYG',
      'value': 'Paraguayan Guarani'
      ,
      createdAt: new Date()
    },
    {
      'id': 191,
      'code': 'PEI',
      'value': 'Peruvian Inti'
      ,
      createdAt: new Date()
    },
    {
      'id': 192,
      'code': 'PEN',
      'value': 'Peruvian Sol'
      ,
      createdAt: new Date()
    },
    {
      'id': 193,
      'code': 'PES',
      'value': 'Peruvian Sol (1863–1965)'
      ,
      createdAt: new Date()
    },
    {
      'id': 194,
      'code': 'PHP',
      'value': 'Philippine Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 195,
      'code': 'PLN',
      'value': 'Polish Zloty'
      ,
      createdAt: new Date()
    },
    {
      'id': 196,
      'code': 'PLZ',
      'value': 'Polish Zloty (1950–1995)'
      ,
      createdAt: new Date()
    },
    {
      'id': 197,
      'code': 'PTE',
      'value': 'Portuguese Escudo'
      ,
      createdAt: new Date()
    },
    {
      'id': 198,
      'code': 'GWE',
      'value': 'Portuguese Guinea Escudo'
      ,
      createdAt: new Date()
    },
    {
      'id': 199,
      'code': 'QAR',
      'value': 'Qatari Rial'
      ,
      createdAt: new Date()
    },
    {
      'id': 200,
      'code': 'XRE',
      'value': 'RINET Funds'
      ,
      createdAt: new Date()
    },
    {
      'id': 201,
      'code': 'RHD',
      'value': 'Rhodesian Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 202,
      'code': 'RON',
      'value': 'Romanian Leu'
      ,
      createdAt: new Date()
    },
    {
      'id': 203,
      'code': 'ROL',
      'value': 'Romanian Leu (1952–2006)'
      ,
      createdAt: new Date()
    },
    {
      'id': 204,
      'code': 'RUB',
      'value': 'Russian Ruble'
      ,
      createdAt: new Date()
    },
    {
      'id': 205,
      'code': 'RUR',
      'value': 'Russian Ruble (1991–1998)'
      ,
      createdAt: new Date()
    },
    {
      'id': 206,
      'code': 'RWF',
      'value': 'Rwandan Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 207,
      'code': 'SVC',
      'value': 'Salvadoran Colón'
      ,
      createdAt: new Date()
    },
    {
      'id': 208,
      'code': 'WST',
      'value': 'Samoan Tala'
      ,
      createdAt: new Date()
    },
    {
      'id': 209,
      'code': 'SAR',
      'value': 'Saudi Riyal'
      ,
      createdAt: new Date()
    },
    {
      'id': 210,
      'code': 'RSD',
      'value': 'Serbian Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 211,
      'code': 'CSD',
      'value': 'Serbian Dinar (2002–2006)'
      ,
      createdAt: new Date()
    },
    {
      'id': 212,
      'code': 'SCR',
      'value': 'Seychellois Rupee'
      ,
      createdAt: new Date()
    },
    {
      'id': 213,
      'code': 'SLL',
      'value': 'Sierra Leonean Leone'
      ,
      createdAt: new Date()
    },
    {
      'id': 214,
      'code': 'SGD',
      'value': 'Singapore Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 215,
      'code': 'SKK',
      'value': 'Slovak Koruna'
      ,
      createdAt: new Date()
    },
    {
      'id': 216,
      'code': 'SIT',
      'value': 'Slovenian Tolar'
      ,
      createdAt: new Date()
    },
    {
      'id': 217,
      'code': 'SBD',
      'value': 'Solomon Islands Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 218,
      'code': 'SOS',
      'value': 'Somali Shilling'
      ,
      createdAt: new Date()
    },
    {
      'id': 219,
      'code': 'ZAR',
      'value': 'South African Rand'
      ,
      createdAt: new Date()
    },
    {
      'id': 220,
      'code': 'ZAL',
      'value': 'South African Rand (financial)'
      ,
      createdAt: new Date()
    },
    {
      'id': 221,
      'code': 'KRH',
      'value': 'South Korean Hwan (1953–1962)'
      ,
      createdAt: new Date()
    },
    {
      'id': 222,
      'code': 'KRW',
      'value': 'South Korean Won'
      ,
      createdAt: new Date()
    },
    {
      'id': 223,
      'code': 'KRO',
      'value': 'South Korean Won (1945–1953)'
      ,
      createdAt: new Date()
    },
    {
      'id': 224,
      'code': 'SSP',
      'value': 'South Sudanese Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 225,
      'code': 'SUR',
      'value': 'Soviet Rouble'
      ,
      createdAt: new Date()
    },
    {
      'id': 226,
      'code': 'ESP',
      'value': 'Spanish Peseta'
      ,
      createdAt: new Date()
    },
    {
      'id': 227,
      'code': 'ESA',
      'value': 'Spanish Peseta (A account)'
      ,
      createdAt: new Date()
    },
    {
      'id': 228,
      'code': 'ESB',
      'value': 'Spanish Peseta (convertible account)'
      ,
      createdAt: new Date()
    },
    {
      'id': 229,
      'code': 'LKR',
      'value': 'Sri Lankan Rupee'
      ,
      createdAt: new Date()
    },
    {
      'id': 230,
      'code': 'SHP',
      'value': 'St. Helena Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 231,
      'code': 'SDD',
      'value': 'Sudanese Dinar (1992–2007)'
      ,
      createdAt: new Date()
    },
    {
      'id': 232,
      'code': 'SDG',
      'value': 'Sudanese Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 233,
      'code': 'SDP',
      'value': 'Sudanese Pound (1957–1998)'
      ,
      createdAt: new Date()
    },
    {
      'id': 234,
      'code': 'SRD',
      'value': 'Surinamese Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 235,
      'code': 'SRG',
      'value': 'Surinamese Guilder'
      ,
      createdAt: new Date()
    },
    {
      'id': 236,
      'code': 'SZL',
      'value': 'Swazi Lilangeni'
      ,
      createdAt: new Date()
    },
    {
      'id': 237,
      'code': 'SEK',
      'value': 'Swedish Krona'
      ,
      createdAt: new Date()
    },
    {
      'id': 238,
      'code': 'CHF',
      'value': 'Swiss Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 239,
      'code': 'SYP',
      'value': 'Syrian Pound'
      ,
      createdAt: new Date()
    },
    {
      'id': 240,
      'code': 'STD',
      'value': 'São Tomé & Príncipe Dobra'
      ,
      createdAt: new Date()
    },
    {
      'id': 241,
      'code': 'TJR',
      'value': 'Tajikistani Ruble'
      ,
      createdAt: new Date()
    },
    {
      'id': 242,
      'code': 'TJS',
      'value': 'Tajikistani Somoni'
      ,
      createdAt: new Date()
    },
    {
      'id': 243,
      'code': 'TZS',
      'value': 'Tanzanian Shilling'
      ,
      createdAt: new Date()
    },
    {
      'id': 244,
      'code': 'THB',
      'value': 'Thai Baht'
      ,
      createdAt: new Date()
    },
    {
      'id': 245,
      'code': 'TPE',
      'value': 'Timorese Escudo'
      ,
      createdAt: new Date()
    },
    {
      'id': 246,
      'code': 'TOP',
      'value': 'Tongan Paanga'
      ,
      createdAt: new Date()
    },
    {
      'id': 247,
      'code': 'TTD',
      'value': 'Trincodead & Tobago Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 248,
      'code': 'TND',
      'value': 'Tunisian Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 249,
      'code': 'TRY',
      'value': 'Turkish Lira'
      ,
      createdAt: new Date()
    },
    {
      'id': 250,
      'code': 'TRL',
      'value': 'Turkish Lira (1922–2005)'
      ,
      createdAt: new Date()
    },
    {
      'id': 251,
      'code': 'TMT',
      'value': 'Turkmenistani Manat'
      ,
      createdAt: new Date()
    },
    {
      'id': 252,
      'code': 'TMM',
      'value': 'Turkmenistani Manat (1993–2009)'
      ,
      createdAt: new Date()
    },
    {
      'id': 253,
      'code': 'USD',
      'value': 'US Dollar'
      ,
      createdAt: new Date()
    },
    {
      'id': 254,
      'code': 'USN',
      'value': 'US Dollar (Next day)'
      ,
      createdAt: new Date()
    },
    {
      'id': 255,
      'code': 'USS',
      'value': 'US Dollar (Same day)'
      ,
      createdAt: new Date()
    },
    {
      'id': 256,
      'code': 'UGX',
      'value': 'Ugandan Shilling'
      ,
      createdAt: new Date()
    },
    {
      'id': 257,
      'code': 'UGS',
      'value': 'Ugandan Shilling (1966–1987)'
      ,
      createdAt: new Date()
    },
    {
      'id': 258,
      'code': 'UAH',
      'value': 'Ukrainian Hryvnia'
      ,
      createdAt: new Date()
    },
    {
      'id': 259,
      'code': 'UAK',
      'value': 'Ukrainian Karbovanets'
      ,
      createdAt: new Date()
    },
    {
      'id': 260,
      'code': 'AED',
      'value': 'United Arab Emirates Dirham'
      ,
      createdAt: new Date()
    },
    {
      'id': 261,
      'code': 'UYU',
      'value': 'Uruguayan Peso'
      ,
      createdAt: new Date()
    },
    {
      'id': 262,
      'code': 'UYP',
      'value': 'Uruguayan Peso (1975–1993)'
      ,
      createdAt: new Date()
    },
    {
      'id': 263,
      'code': 'UYI',
      'value': 'Uruguayan Peso (Indexed Units)'
      ,
      createdAt: new Date()
    },
    {
      'id': 264,
      'code': 'UZS',
      'value': 'Uzbekistani Som'
      ,
      createdAt: new Date()
    },
    {
      'id': 265,
      'code': 'VUV',
      'value': 'Vanuatu Vatu'
      ,
      createdAt: new Date()
    },
    {
      'id': 266,
      'code': 'VEF',
      'value': 'Venezuelan Bolívar'
      ,
      createdAt: new Date()
    },
    {
      'id': 267,
      'code': 'VEB',
      'value': 'Venezuelan Bolívar (1871–2008)'
      ,
      createdAt: new Date()
    },
    {
      'id': 268,
      'code': 'VND',
      'value': 'Vietnamese Dong'
      ,
      createdAt: new Date()
    },
    {
      'id': 269,
      'code': 'VNN',
      'value': 'Vietnamese Dong (1978–1985)'
      ,
      createdAt: new Date()
    },
    {
      'id': 270,
      'code': 'CHE',
      'value': 'WIR Euro'
      ,
      createdAt: new Date()
    },
    {
      'id': 271,
      'code': 'CHW',
      'value': 'WIR Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 272,
      'code': 'XOF',
      'value': 'West African CFA Franc'
      ,
      createdAt: new Date()
    },
    {
      'id': 273,
      'code': 'YDD',
      'value': 'Yemeni Dinar'
      ,
      createdAt: new Date()
    },
    {
      'id': 274,
      'code': 'YER',
      'value': 'Yemeni Rial'
      ,
      createdAt: new Date()
    },
    {
      'id': 275,
      'code': 'YUN',
      'value': 'Yugoslavian Convertible Dinar (1990–1992)'
      ,
      createdAt: new Date()
    },
    {
      'id': 276,
      'code': 'YUD',
      'value': 'Yugoslavian Hard Dinar (1966–1990)'
      ,
      createdAt: new Date()
    },
    {
      'id': 277,
      'code': 'YUM',
      'value': 'Yugoslavian New Dinar (1994–2002)'
      ,
      createdAt: new Date()
    },
    {
      'id': 278,
      'code': 'YUR',
      'value': 'Yugoslavian Reformed Dinar (1992–1993)'
      ,
      createdAt: new Date()
    },
    {
      'id': 279,
      'code': 'ZRN',
      'value': 'Zairean New Zaire (1993–1998)'
      ,
      createdAt: new Date()
    },
    {
      'id': 280,
      'code': 'ZRZ',
      'value': 'Zairean Zaire (1971–1993)'
      ,
      createdAt: new Date()
    },
    {
      'id': 281,
      'code': 'ZMW',
      'value': 'Zambian Kwacha'
      ,
      createdAt: new Date()
    },
    {
      'id': 282,
      'code': 'ZMK',
      'value': 'Zambian Kwacha (1968–2012)'
      ,
      createdAt: new Date()
    },
    {
      'id': 283,
      'code': 'ZWD',
      'value': 'Zimbabwean Dollar (1980–2008)'
      ,
      createdAt: new Date()
    },
    {
      'id': 284,
      'code': 'ZWR',
      'value': 'Zimbabwean Dollar (2008)'
      ,
      createdAt: new Date()
    },
    {
      'id': 285,
      'code': 'ZWL',
      'value': 'Zimbabwean Dollar (2009)',
      createdAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('currencies', null, {})
};
