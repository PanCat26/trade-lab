const initialPositions= [
  { id: 1, ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 10, entryPrice: 150, exitPrice: 165, stopLoss: 140 },
  { id: 2, ticker: 'GOOGL', security: 'Alphabet Inc', type: 'short', size: 5, entryPrice: 2800, exitPrice: 2600, stopLoss: 2850 },
  { id: 3, ticker: 'TSLA', security: 'Tesla Inc', type: 'long', size: 12, entryPrice: 700, exitPrice: 750, stopLoss: 670 },
  { id: 4, ticker: 'MSFT', security: 'Microsoft Corp', type: 'long', size: 20, entryPrice: 290, exitPrice: 305 },
  { id: 5, ticker: 'NFLX', security: 'Netflix Inc', type: 'short', size: 8, entryPrice: 550, exitPrice: 520, stopLoss: 570 }
];

const initialPositionsMany = [
  {
    "id": 1,
    "ticker": "AAPL",
    "security": "Apple Inc",
    "type": "short",
    "size": 14,
    "entryPrice": 2585.76,
    "exitPrice": 2658.36
  },
  {
    "id": 2,
    "ticker": "GOOGL",
    "security": "Alphabet Inc",
    "type": "long",
    "size": 6,
    "entryPrice": 1189.45,
    "exitPrice": 1314.49
  },
  {
    "id": 3,
    "ticker": "TSLA",
    "security": "Tesla Inc",
    "type": "short",
    "size": 16,
    "entryPrice": 790.6,
    "exitPrice": 694.82
  },
  {
    "id": 4,
    "ticker": "MSFT",
    "security": "Microsoft Corp",
    "type": "short",
    "size": 9,
    "entryPrice": 430.24,
    "exitPrice": 379.93
  },
  {
    "id": 5,
    "ticker": "NFLX",
    "security": "Netflix Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 2628.79,
    "exitPrice": 2542.64
  },
  {
    "id": 6,
    "ticker": "AMZN",
    "security": "Amazon.com Inc",
    "type": "long",
    "size": 8,
    "entryPrice": 2504.07,
    "exitPrice": 2610.2
  },
  {
    "id": 7,
    "ticker": "NVDA",
    "security": "NVIDIA Corp",
    "type": "long",
    "size": 5,
    "entryPrice": 1765.23,
    "exitPrice": 1723.81
  },
  {
    "id": 8,
    "ticker": "META",
    "security": "Meta Platforms Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 2385.11,
    "exitPrice": 2481.65
  },
  {
    "id": 9,
    "ticker": "AMD",
    "security": "Advanced Micro Devices Inc",
    "type": "short",
    "size": 9,
    "entryPrice": 2187.18,
    "exitPrice": 2249.78,
    "stopLoss": 2155.26
  },
  {
    "id": 10,
    "ticker": "INTC",
    "security": "Intel Corp",
    "type": "short",
    "size": 20,
    "entryPrice": 328.17,
    "exitPrice": 321.95
  },
  {
    "id": 11,
    "ticker": "BABA",
    "security": "Alibaba Group Holding Ltd",
    "type": "short",
    "size": 11,
    "entryPrice": 646.15,
    "exitPrice": 653.32
  },
  {
    "id": 12,
    "ticker": "ORCL",
    "security": "Oracle Corp",
    "type": "long",
    "size": 10,
    "entryPrice": 2007.14,
    "exitPrice": 2130.66,
    "stopLoss": 1966.26
  },
  {
    "id": 13,
    "ticker": "SAP",
    "security": "SAP SE",
    "type": "long",
    "size": 11,
    "entryPrice": 1587.41,
    "exitPrice": 1734.96,
    "stopLoss": 1504.38
  },
  {
    "id": 14,
    "ticker": "UBER",
    "security": "Uber Technologies Inc",
    "type": "short",
    "size": 1,
    "entryPrice": 2639.83,
    "exitPrice": 2673.86
  },
  {
    "id": 15,
    "ticker": "LYFT",
    "security": "Lyft Inc",
    "type": "short",
    "size": 18,
    "entryPrice": 1422.76,
    "exitPrice": 1439.33
  },
  {
    "id": 16,
    "ticker": "SHOP",
    "security": "Shopify Inc",
    "type": "long",
    "size": 16,
    "entryPrice": 1152.01,
    "exitPrice": 1251.34,
    "stopLoss": 1127.52
  },
  {
    "id": 17,
    "ticker": "SQ",
    "security": "Block Inc",
    "type": "short",
    "size": 7,
    "entryPrice": 2460.67,
    "exitPrice": 2553.98,
    "stopLoss": 2390.97
  },
  {
    "id": 18,
    "ticker": "PYPL",
    "security": "PayPal Holdings Inc",
    "type": "long",
    "size": 18,
    "entryPrice": 859.28,
    "exitPrice": 896.9
  },
  {
    "id": 19,
    "ticker": "TWTR",
    "security": "Twitter Inc",
    "type": "short",
    "size": 2,
    "entryPrice": 299.41,
    "exitPrice": 416.48
  },
  {
    "id": 20,
    "ticker": "ZM",
    "security": "Zoom Video Communications Inc",
    "type": "long",
    "size": 3,
    "entryPrice": 2897.02,
    "exitPrice": 2804.84
  },
  {
    "id": 21,
    "ticker": "CRM",
    "security": "Salesforce Inc",
    "type": "long",
    "size": 18,
    "entryPrice": 1802.31,
    "exitPrice": 1925.07,
    "stopLoss": 1771.69
  },
  {
    "id": 22,
    "ticker": "ADBE",
    "security": "Adobe Inc",
    "type": "short",
    "size": 4,
    "entryPrice": 2635.39,
    "exitPrice": 2647.18,
    "stopLoss": 2574.39
  },
  {
    "id": 23,
    "ticker": "SPOT",
    "security": "Spotify Technology SA",
    "type": "short",
    "size": 19,
    "entryPrice": 2089.62,
    "exitPrice": 2164.5
  },
  {
    "id": 24,
    "ticker": "COIN",
    "security": "Coinbase Global Inc",
    "type": "long",
    "size": 19,
    "entryPrice": 174.05,
    "exitPrice": 142.55
  },
  {
    "id": 25,
    "ticker": "RBLX",
    "security": "Roblox Corp",
    "type": "short",
    "size": 13,
    "entryPrice": 2052.22,
    "exitPrice": 2105.99
  },
  {
    "id": 26,
    "ticker": "PLTR",
    "security": "Palantir Technologies Inc",
    "type": "short",
    "size": 1,
    "entryPrice": 2544.19,
    "exitPrice": 2541.45,
    "stopLoss": 2522.19
  },
  {
    "id": 27,
    "ticker": "NET",
    "security": "Cloudflare Inc",
    "type": "short",
    "size": 15,
    "entryPrice": 1757.27,
    "exitPrice": 1751.08,
    "stopLoss": 1662.43
  },
  {
    "id": 28,
    "ticker": "DOCU",
    "security": "DocuSign Inc",
    "type": "short",
    "size": 7,
    "entryPrice": 1406.35,
    "exitPrice": 1348.73,
    "stopLoss": 1377.89
  },
  {
    "id": 29,
    "ticker": "SNOW",
    "security": "Snowflake Inc",
    "type": "short",
    "size": 5,
    "entryPrice": 2584.88,
    "exitPrice": 2728.15,
    "stopLoss": 2497.88
  },
  {
    "id": 30,
    "ticker": "ASML",
    "security": "ASML Holding NV",
    "type": "long",
    "size": 10,
    "entryPrice": 288.33,
    "exitPrice": 253.9,
    "stopLoss": 200.55
  },
  {
    "id": 31,
    "ticker": "AAPL",
    "security": "Apple Inc",
    "type": "short",
    "size": 7,
    "entryPrice": 2912.77,
    "exitPrice": 2890.04,
    "stopLoss": 2891.36
  },
  {
    "id": 32,
    "ticker": "GOOGL",
    "security": "Alphabet Inc",
    "type": "short",
    "size": 20,
    "entryPrice": 2145.6,
    "exitPrice": 2205.25
  },
  {
    "id": 33,
    "ticker": "TSLA",
    "security": "Tesla Inc",
    "type": "short",
    "size": 11,
    "entryPrice": 1339.95,
    "exitPrice": 1319.36,
    "stopLoss": 1289.08
  },
  {
    "id": 34,
    "ticker": "MSFT",
    "security": "Microsoft Corp",
    "type": "long",
    "size": 18,
    "entryPrice": 2798.06,
    "exitPrice": 2858.07,
    "stopLoss": 2724.49
  },
  {
    "id": 35,
    "ticker": "NFLX",
    "security": "Netflix Inc",
    "type": "short",
    "size": 2,
    "entryPrice": 1521.71,
    "exitPrice": 1563.26,
    "stopLoss": 1500.77
  },
  {
    "id": 36,
    "ticker": "AMZN",
    "security": "Amazon.com Inc",
    "type": "long",
    "size": 8,
    "entryPrice": 290.52,
    "exitPrice": 270.67,
    "stopLoss": 253.31
  },
  {
    "id": 37,
    "ticker": "NVDA",
    "security": "NVIDIA Corp",
    "type": "long",
    "size": 17,
    "entryPrice": 2222.83,
    "exitPrice": 2179.81
  },
  {
    "id": 38,
    "ticker": "META",
    "security": "Meta Platforms Inc",
    "type": "short",
    "size": 9,
    "entryPrice": 1624.73,
    "exitPrice": 1752.66
  },
  {
    "id": 39,
    "ticker": "AMD",
    "security": "Advanced Micro Devices Inc",
    "type": "long",
    "size": 20,
    "entryPrice": 2614.0,
    "exitPrice": 2677.8,
    "stopLoss": 2584.92
  },
  {
    "id": 40,
    "ticker": "INTC",
    "security": "Intel Corp",
    "type": "short",
    "size": 5,
    "entryPrice": 792.77,
    "exitPrice": 811.09,
    "stopLoss": 764.57
  },
  {
    "id": 41,
    "ticker": "BABA",
    "security": "Alibaba Group Holding Ltd",
    "type": "short",
    "size": 13,
    "entryPrice": 2680.49,
    "exitPrice": 2585.95,
    "stopLoss": 2639.76
  },
  {
    "id": 42,
    "ticker": "ORCL",
    "security": "Oracle Corp",
    "type": "short",
    "size": 17,
    "entryPrice": 1653.54,
    "exitPrice": 1790.92
  },
  {
    "id": 43,
    "ticker": "SAP",
    "security": "SAP SE",
    "type": "short",
    "size": 5,
    "entryPrice": 269.0,
    "exitPrice": 237.46,
    "stopLoss": 230.84
  },
  {
    "id": 44,
    "ticker": "UBER",
    "security": "Uber Technologies Inc",
    "type": "long",
    "size": 19,
    "entryPrice": 118.75,
    "exitPrice": 216.26,
    "stopLoss": 85.27
  },
  {
    "id": 45,
    "ticker": "LYFT",
    "security": "Lyft Inc",
    "type": "long",
    "size": 9,
    "entryPrice": 2426.62,
    "exitPrice": 2391.14
  },
  {
    "id": 46,
    "ticker": "SHOP",
    "security": "Shopify Inc",
    "type": "long",
    "size": 8,
    "entryPrice": 2936.99,
    "exitPrice": 2838.24
  },
  {
    "id": 47,
    "ticker": "SQ",
    "security": "Block Inc",
    "type": "long",
    "size": 7,
    "entryPrice": 1484.07,
    "exitPrice": 1426.63,
    "stopLoss": 1415.54
  },
  {
    "id": 48,
    "ticker": "PYPL",
    "security": "PayPal Holdings Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 669.7,
    "exitPrice": 758.55
  },
  {
    "id": 49,
    "ticker": "TWTR",
    "security": "Twitter Inc",
    "type": "long",
    "size": 10,
    "entryPrice": 238.08,
    "exitPrice": 327.6
  },
  {
    "id": 50,
    "ticker": "ZM",
    "security": "Zoom Video Communications Inc",
    "type": "short",
    "size": 2,
    "entryPrice": 977.95,
    "exitPrice": 907.8,
    "stopLoss": 924.09
  },
  {
    "id": 51,
    "ticker": "CRM",
    "security": "Salesforce Inc",
    "type": "long",
    "size": 17,
    "entryPrice": 502.03,
    "exitPrice": 626.6
  },
  {
    "id": 52,
    "ticker": "ADBE",
    "security": "Adobe Inc",
    "type": "short",
    "size": 13,
    "entryPrice": 2315.02,
    "exitPrice": 2370.91,
    "stopLoss": 2232.33
  },
  {
    "id": 53,
    "ticker": "SPOT",
    "security": "Spotify Technology SA",
    "type": "short",
    "size": 1,
    "entryPrice": 2272.41,
    "exitPrice": 2258.02
  },
  {
    "id": 54,
    "ticker": "COIN",
    "security": "Coinbase Global Inc",
    "type": "short",
    "size": 3,
    "entryPrice": 205.73,
    "exitPrice": 151.26,
    "stopLoss": 132.31
  },
  {
    "id": 55,
    "ticker": "RBLX",
    "security": "Roblox Corp",
    "type": "long",
    "size": 7,
    "entryPrice": 785.8,
    "exitPrice": 896.7
  },
  {
    "id": 56,
    "ticker": "PLTR",
    "security": "Palantir Technologies Inc",
    "type": "long",
    "size": 8,
    "entryPrice": 33.66,
    "exitPrice": 56.08,
    "stopLoss": -51.07
  },
  {
    "id": 57,
    "ticker": "NET",
    "security": "Cloudflare Inc",
    "type": "short",
    "size": 13,
    "entryPrice": 1958.0,
    "exitPrice": 1928.34,
    "stopLoss": 1944.62
  },
  {
    "id": 58,
    "ticker": "DOCU",
    "security": "DocuSign Inc",
    "type": "short",
    "size": 3,
    "entryPrice": 2018.21,
    "exitPrice": 1930.84
  },
  {
    "id": 59,
    "ticker": "SNOW",
    "security": "Snowflake Inc",
    "type": "short",
    "size": 3,
    "entryPrice": 2876.25,
    "exitPrice": 2823.79
  },
  {
    "id": 60,
    "ticker": "ASML",
    "security": "ASML Holding NV",
    "type": "long",
    "size": 12,
    "entryPrice": 539.91,
    "exitPrice": 640.89,
    "stopLoss": 521.29
  },
  {
    "id": 61,
    "ticker": "AAPL",
    "security": "Apple Inc",
    "type": "long",
    "size": 12,
    "entryPrice": 2164.53,
    "exitPrice": 2146.59,
    "stopLoss": 2077.99
  },
  {
    "id": 62,
    "ticker": "GOOGL",
    "security": "Alphabet Inc",
    "type": "long",
    "size": 16,
    "entryPrice": 447.1,
    "exitPrice": 497.88
  },
  {
    "id": 63,
    "ticker": "TSLA",
    "security": "Tesla Inc",
    "type": "short",
    "size": 9,
    "entryPrice": 2292.9,
    "exitPrice": 2359.03,
    "stopLoss": 2247.98
  },
  {
    "id": 64,
    "ticker": "MSFT",
    "security": "Microsoft Corp",
    "type": "long",
    "size": 7,
    "entryPrice": 2765.61,
    "exitPrice": 2755.72,
    "stopLoss": 2711.41
  },
  {
    "id": 65,
    "ticker": "NFLX",
    "security": "Netflix Inc",
    "type": "long",
    "size": 10,
    "entryPrice": 2495.25,
    "exitPrice": 2595.43
  },
  {
    "id": 66,
    "ticker": "AMZN",
    "security": "Amazon.com Inc",
    "type": "short",
    "size": 7,
    "entryPrice": 2560.29,
    "exitPrice": 2684.5
  },
  {
    "id": 67,
    "ticker": "NVDA",
    "security": "NVIDIA Corp",
    "type": "long",
    "size": 12,
    "entryPrice": 2505.02,
    "exitPrice": 2454.91
  },
  {
    "id": 68,
    "ticker": "META",
    "security": "Meta Platforms Inc",
    "type": "long",
    "size": 15,
    "entryPrice": 313.63,
    "exitPrice": 219.62
  },
  {
    "id": 69,
    "ticker": "AMD",
    "security": "Advanced Micro Devices Inc",
    "type": "long",
    "size": 10,
    "entryPrice": 2710.51,
    "exitPrice": 2806.88,
    "stopLoss": 2660.84
  },
  {
    "id": 70,
    "ticker": "INTC",
    "security": "Intel Corp",
    "type": "short",
    "size": 8,
    "entryPrice": 2746.55,
    "exitPrice": 2819.72
  },
  {
    "id": 71,
    "ticker": "BABA",
    "security": "Alibaba Group Holding Ltd",
    "type": "long",
    "size": 8,
    "entryPrice": 2666.49,
    "exitPrice": 2600.52
  },
  {
    "id": 72,
    "ticker": "ORCL",
    "security": "Oracle Corp",
    "type": "short",
    "size": 4,
    "entryPrice": 1883.97,
    "exitPrice": 1942.72
  },
  {
    "id": 73,
    "ticker": "SAP",
    "security": "SAP SE",
    "type": "short",
    "size": 1,
    "entryPrice": 2732.33,
    "exitPrice": 2658.64,
    "stopLoss": 2677.67
  },
  {
    "id": 74,
    "ticker": "UBER",
    "security": "Uber Technologies Inc",
    "type": "short",
    "size": 15,
    "entryPrice": 2715.32,
    "exitPrice": 2775.76
  },
  {
    "id": 75,
    "ticker": "LYFT",
    "security": "Lyft Inc",
    "type": "short",
    "size": 7,
    "entryPrice": 2139.4,
    "exitPrice": 2096.44,
    "stopLoss": 2054.79
  },
  {
    "id": 76,
    "ticker": "SHOP",
    "security": "Shopify Inc",
    "type": "long",
    "size": 10,
    "entryPrice": 1395.44,
    "exitPrice": 1431.89
  },
  {
    "id": 77,
    "ticker": "SQ",
    "security": "Block Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 406.54,
    "exitPrice": 555.9
  },
  {
    "id": 78,
    "ticker": "PYPL",
    "security": "PayPal Holdings Inc",
    "type": "long",
    "size": 17,
    "entryPrice": 2458.83,
    "exitPrice": 2449.42
  },
  {
    "id": 79,
    "ticker": "TWTR",
    "security": "Twitter Inc",
    "type": "short",
    "size": 20,
    "entryPrice": 314.39,
    "exitPrice": 404.93,
    "stopLoss": 303.99
  },
  {
    "id": 80,
    "ticker": "ZM",
    "security": "Zoom Video Communications Inc",
    "type": "short",
    "size": 14,
    "entryPrice": 253.11,
    "exitPrice": 391.76,
    "stopLoss": 205.8
  },
  {
    "id": 81,
    "ticker": "CRM",
    "security": "Salesforce Inc",
    "type": "short",
    "size": 14,
    "entryPrice": 1302.54,
    "exitPrice": 1388.91,
    "stopLoss": 1254.83
  },
  {
    "id": 82,
    "ticker": "ADBE",
    "security": "Adobe Inc",
    "type": "short",
    "size": 4,
    "entryPrice": 1001.87,
    "exitPrice": 1109.86
  },
  {
    "id": 83,
    "ticker": "SPOT",
    "security": "Spotify Technology SA",
    "type": "short",
    "size": 9,
    "entryPrice": 2137.36,
    "exitPrice": 2152.25
  },
  {
    "id": 84,
    "ticker": "COIN",
    "security": "Coinbase Global Inc",
    "type": "short",
    "size": 3,
    "entryPrice": 480.14,
    "exitPrice": 483.17
  },
  {
    "id": 85,
    "ticker": "RBLX",
    "security": "Roblox Corp",
    "type": "short",
    "size": 7,
    "entryPrice": 2445.34,
    "exitPrice": 2383.98,
    "stopLoss": 2377.13
  },
  {
    "id": 86,
    "ticker": "PLTR",
    "security": "Palantir Technologies Inc",
    "type": "short",
    "size": 2,
    "entryPrice": 1133.12,
    "exitPrice": 1079.66
  },
  {
    "id": 87,
    "ticker": "NET",
    "security": "Cloudflare Inc",
    "type": "short",
    "size": 3,
    "entryPrice": 1436.29,
    "exitPrice": 1353.03
  },
  {
    "id": 88,
    "ticker": "DOCU",
    "security": "DocuSign Inc",
    "type": "long",
    "size": 7,
    "entryPrice": 1224.81,
    "exitPrice": 1128.91,
    "stopLoss": 1183.13
  },
  {
    "id": 89,
    "ticker": "SNOW",
    "security": "Snowflake Inc",
    "type": "long",
    "size": 20,
    "entryPrice": 40.25,
    "exitPrice": 57.94
  },
  {
    "id": 90,
    "ticker": "ASML",
    "security": "ASML Holding NV",
    "type": "short",
    "size": 18,
    "entryPrice": 2040.8,
    "exitPrice": 1956.51
  },
  {
    "id": 91,
    "ticker": "AAPL",
    "security": "Apple Inc",
    "type": "long",
    "size": 7,
    "entryPrice": 1704.83,
    "exitPrice": 1721.05
  },
  {
    "id": 92,
    "ticker": "GOOGL",
    "security": "Alphabet Inc",
    "type": "short",
    "size": 7,
    "entryPrice": 282.07,
    "exitPrice": 380.35
  },
  {
    "id": 93,
    "ticker": "TSLA",
    "security": "Tesla Inc",
    "type": "long",
    "size": 16,
    "entryPrice": 2130.91,
    "exitPrice": 2090.16,
    "stopLoss": 2105.24
  },
  {
    "id": 94,
    "ticker": "MSFT",
    "security": "Microsoft Corp",
    "type": "short",
    "size": 18,
    "entryPrice": 2375.54,
    "exitPrice": 2348.08,
    "stopLoss": 2323.74
  },
  {
    "id": 95,
    "ticker": "NFLX",
    "security": "Netflix Inc",
    "type": "short",
    "size": 16,
    "entryPrice": 2541.58,
    "exitPrice": 2672.74,
    "stopLoss": 2502.98
  },
  {
    "id": 96,
    "ticker": "AMZN",
    "security": "Amazon.com Inc",
    "type": "short",
    "size": 8,
    "entryPrice": 2012.31,
    "exitPrice": 2049.43,
    "stopLoss": 1932.97
  },
  {
    "id": 97,
    "ticker": "NVDA",
    "security": "NVIDIA Corp",
    "type": "short",
    "size": 15,
    "entryPrice": 2951.35,
    "exitPrice": 2980.99,
    "stopLoss": 2918.15
  },
  {
    "id": 98,
    "ticker": "META",
    "security": "Meta Platforms Inc",
    "type": "long",
    "size": 6,
    "entryPrice": 1360.34,
    "exitPrice": 1381.63,
    "stopLoss": 1283.77
  },
  {
    "id": 99,
    "ticker": "AMD",
    "security": "Advanced Micro Devices Inc",
    "type": "long",
    "size": 1,
    "entryPrice": 48.28,
    "exitPrice": 182.1
  },
  {
    "id": 100,
    "ticker": "INTC",
    "security": "Intel Corp",
    "type": "long",
    "size": 9,
    "entryPrice": 853.02,
    "exitPrice": 843.27
  },
  {
    "id": 101,
    "ticker": "BABA",
    "security": "Alibaba Group Holding Ltd",
    "type": "short",
    "size": 8,
    "entryPrice": 730.5,
    "exitPrice": 664.55,
    "stopLoss": 644.53
  },
  {
    "id": 102,
    "ticker": "ORCL",
    "security": "Oracle Corp",
    "type": "short",
    "size": 1,
    "entryPrice": 486.84,
    "exitPrice": 558.0,
    "stopLoss": 406.46
  },
  {
    "id": 103,
    "ticker": "SAP",
    "security": "SAP SE",
    "type": "short",
    "size": 18,
    "entryPrice": 2184.52,
    "exitPrice": 2175.36
  },
  {
    "id": 104,
    "ticker": "UBER",
    "security": "Uber Technologies Inc",
    "type": "short",
    "size": 7,
    "entryPrice": 2131.75,
    "exitPrice": 2064.96
  },
  {
    "id": 105,
    "ticker": "LYFT",
    "security": "Lyft Inc",
    "type": "short",
    "size": 11,
    "entryPrice": 2646.47,
    "exitPrice": 2634.98,
    "stopLoss": 2610.81
  },
  {
    "id": 106,
    "ticker": "SHOP",
    "security": "Shopify Inc",
    "type": "short",
    "size": 17,
    "entryPrice": 79.1,
    "exitPrice": -4.16
  },
  {
    "id": 107,
    "ticker": "SQ",
    "security": "Block Inc",
    "type": "long",
    "size": 8,
    "entryPrice": 92.3,
    "exitPrice": 20.8
  },
  {
    "id": 108,
    "ticker": "PYPL",
    "security": "PayPal Holdings Inc",
    "type": "long",
    "size": 15,
    "entryPrice": 309.17,
    "exitPrice": 328.36,
    "stopLoss": 278.44
  },
  {
    "id": 109,
    "ticker": "TWTR",
    "security": "Twitter Inc",
    "type": "short",
    "size": 14,
    "entryPrice": 2142.01,
    "exitPrice": 2246.01
  },
  {
    "id": 110,
    "ticker": "ZM",
    "security": "Zoom Video Communications Inc",
    "type": "short",
    "size": 5,
    "entryPrice": 1724.17,
    "exitPrice": 1651.06
  },
  {
    "id": 111,
    "ticker": "CRM",
    "security": "Salesforce Inc",
    "type": "long",
    "size": 2,
    "entryPrice": 2327.95,
    "exitPrice": 2361.58,
    "stopLoss": 2265.58
  },
  {
    "id": 112,
    "ticker": "ADBE",
    "security": "Adobe Inc",
    "type": "long",
    "size": 19,
    "entryPrice": 195.08,
    "exitPrice": 189.36
  },
  {
    "id": 113,
    "ticker": "SPOT",
    "security": "Spotify Technology SA",
    "type": "long",
    "size": 10,
    "entryPrice": 1421.92,
    "exitPrice": 1364.86
  },
  {
    "id": 114,
    "ticker": "COIN",
    "security": "Coinbase Global Inc",
    "type": "long",
    "size": 4,
    "entryPrice": 1050.82,
    "exitPrice": 1161.14
  },
  {
    "id": 115,
    "ticker": "RBLX",
    "security": "Roblox Corp",
    "type": "short",
    "size": 19,
    "entryPrice": 1852.22,
    "exitPrice": 1884.95,
    "stopLoss": 1834.94
  },
  {
    "id": 116,
    "ticker": "PLTR",
    "security": "Palantir Technologies Inc",
    "type": "long",
    "size": 1,
    "entryPrice": 708.84,
    "exitPrice": 850.73,
    "stopLoss": 681.33
  },
  {
    "id": 117,
    "ticker": "NET",
    "security": "Cloudflare Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 685.38,
    "exitPrice": 833.55
  },
  {
    "id": 118,
    "ticker": "DOCU",
    "security": "DocuSign Inc",
    "type": "long",
    "size": 2,
    "entryPrice": 1646.57,
    "exitPrice": 1658.01,
    "stopLoss": 1565.48
  },
  {
    "id": 119,
    "ticker": "SNOW",
    "security": "Snowflake Inc",
    "type": "long",
    "size": 9,
    "entryPrice": 1521.67,
    "exitPrice": 1521.43
  },
  {
    "id": 120,
    "ticker": "ASML",
    "security": "ASML Holding NV",
    "type": "short",
    "size": 19,
    "entryPrice": 445.96,
    "exitPrice": 559.03
  },
  {
    "id": 121,
    "ticker": "AAPL",
    "security": "Apple Inc",
    "type": "long",
    "size": 10,
    "entryPrice": 1364.84,
    "exitPrice": 1314.99,
    "stopLoss": 1284.36
  },
  {
    "id": 122,
    "ticker": "GOOGL",
    "security": "Alphabet Inc",
    "type": "short",
    "size": 11,
    "entryPrice": 714.04,
    "exitPrice": 777.72,
    "stopLoss": 699.92
  },
  {
    "id": 123,
    "ticker": "TSLA",
    "security": "Tesla Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 1362.97,
    "exitPrice": 1301.07
  },
  {
    "id": 124,
    "ticker": "MSFT",
    "security": "Microsoft Corp",
    "type": "short",
    "size": 4,
    "entryPrice": 2440.05,
    "exitPrice": 2435.66
  },
  {
    "id": 125,
    "ticker": "NFLX",
    "security": "Netflix Inc",
    "type": "long",
    "size": 19,
    "entryPrice": 1799.98,
    "exitPrice": 1703.95
  },
  {
    "id": 126,
    "ticker": "AMZN",
    "security": "Amazon.com Inc",
    "type": "long",
    "size": 10,
    "entryPrice": 2652.33,
    "exitPrice": 2715.73
  },
  {
    "id": 127,
    "ticker": "NVDA",
    "security": "NVIDIA Corp",
    "type": "long",
    "size": 4,
    "entryPrice": 1287.02,
    "exitPrice": 1231.54,
    "stopLoss": 1249.21
  },
  {
    "id": 128,
    "ticker": "META",
    "security": "Meta Platforms Inc",
    "type": "short",
    "size": 13,
    "entryPrice": 2743.38,
    "exitPrice": 2888.05,
    "stopLoss": 2721.94
  },
  {
    "id": 129,
    "ticker": "AMD",
    "security": "Advanced Micro Devices Inc",
    "type": "short",
    "size": 8,
    "entryPrice": 1188.44,
    "exitPrice": 1216.31
  },
  {
    "id": 130,
    "ticker": "INTC",
    "security": "Intel Corp",
    "type": "short",
    "size": 11,
    "entryPrice": 2972.11,
    "exitPrice": 3090.01
  },
  {
    "id": 131,
    "ticker": "BABA",
    "security": "Alibaba Group Holding Ltd",
    "type": "long",
    "size": 11,
    "entryPrice": 2073.21,
    "exitPrice": 2181.32,
    "stopLoss": 2022.68
  },
  {
    "id": 132,
    "ticker": "ORCL",
    "security": "Oracle Corp",
    "type": "short",
    "size": 11,
    "entryPrice": 1395.18,
    "exitPrice": 1355.47
  },
  {
    "id": 133,
    "ticker": "SAP",
    "security": "SAP SE",
    "type": "short",
    "size": 20,
    "entryPrice": 2132.09,
    "exitPrice": 2204.72,
    "stopLoss": 2105.31
  },
  {
    "id": 134,
    "ticker": "UBER",
    "security": "Uber Technologies Inc",
    "type": "short",
    "size": 1,
    "entryPrice": 759.88,
    "exitPrice": 833.27,
    "stopLoss": 692.04
  },
  {
    "id": 135,
    "ticker": "LYFT",
    "security": "Lyft Inc",
    "type": "short",
    "size": 16,
    "entryPrice": 813.61,
    "exitPrice": 913.3
  },
  {
    "id": 136,
    "ticker": "SHOP",
    "security": "Shopify Inc",
    "type": "short",
    "size": 14,
    "entryPrice": 1229.05,
    "exitPrice": 1187.11
  },
  {
    "id": 137,
    "ticker": "SQ",
    "security": "Block Inc",
    "type": "short",
    "size": 3,
    "entryPrice": 911.19,
    "exitPrice": 1056.98,
    "stopLoss": 890.61
  },
  {
    "id": 138,
    "ticker": "PYPL",
    "security": "PayPal Holdings Inc",
    "type": "long",
    "size": 1,
    "entryPrice": 1389.45,
    "exitPrice": 1322.96
  },
  {
    "id": 139,
    "ticker": "TWTR",
    "security": "Twitter Inc",
    "type": "short",
    "size": 1,
    "entryPrice": 743.65,
    "exitPrice": 846.98
  },
  {
    "id": 140,
    "ticker": "ZM",
    "security": "Zoom Video Communications Inc",
    "type": "long",
    "size": 17,
    "entryPrice": 1307.14,
    "exitPrice": 1240.77,
    "stopLoss": 1265.84
  },
  {
    "id": 141,
    "ticker": "CRM",
    "security": "Salesforce Inc",
    "type": "long",
    "size": 3,
    "entryPrice": 1070.52,
    "exitPrice": 1049.32,
    "stopLoss": 1042.94
  },
  {
    "id": 142,
    "ticker": "ADBE",
    "security": "Adobe Inc",
    "type": "short",
    "size": 1,
    "entryPrice": 923.41,
    "exitPrice": 1043.2
  },
  {
    "id": 143,
    "ticker": "SPOT",
    "security": "Spotify Technology SA",
    "type": "long",
    "size": 9,
    "entryPrice": 2375.03,
    "exitPrice": 2399.74
  },
  {
    "id": 144,
    "ticker": "COIN",
    "security": "Coinbase Global Inc",
    "type": "short",
    "size": 9,
    "entryPrice": 1857.48,
    "exitPrice": 1841.13
  },
  {
    "id": 145,
    "ticker": "RBLX",
    "security": "Roblox Corp",
    "type": "long",
    "size": 6,
    "entryPrice": 1680.18,
    "exitPrice": 1697.18,
    "stopLoss": 1633.84
  },
  {
    "id": 146,
    "ticker": "PLTR",
    "security": "Palantir Technologies Inc",
    "type": "long",
    "size": 16,
    "entryPrice": 902.81,
    "exitPrice": 953.33,
    "stopLoss": 885.62
  },
  {
    "id": 147,
    "ticker": "NET",
    "security": "Cloudflare Inc",
    "type": "long",
    "size": 10,
    "entryPrice": 2749.94,
    "exitPrice": 2801.05,
    "stopLoss": 2711.94
  },
  {
    "id": 148,
    "ticker": "DOCU",
    "security": "DocuSign Inc",
    "type": "long",
    "size": 15,
    "entryPrice": 867.77,
    "exitPrice": 954.6
  },
  {
    "id": 149,
    "ticker": "SNOW",
    "security": "Snowflake Inc",
    "type": "short",
    "size": 16,
    "entryPrice": 1527.67,
    "exitPrice": 1509.51,
    "stopLoss": 1431.63
  },
  {
    "id": 150,
    "ticker": "ASML",
    "security": "ASML Holding NV",
    "type": "long",
    "size": 1,
    "entryPrice": 393.42,
    "exitPrice": 365.87,
    "stopLoss": 309.19
  },
  {
    "id": 151,
    "ticker": "AAPL",
    "security": "Apple Inc",
    "type": "long",
    "size": 17,
    "entryPrice": 2187.31,
    "exitPrice": 2172.67
  },
  {
    "id": 152,
    "ticker": "GOOGL",
    "security": "Alphabet Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 2599.78,
    "exitPrice": 2705.18,
    "stopLoss": 2561.96
  },
  {
    "id": 153,
    "ticker": "TSLA",
    "security": "Tesla Inc",
    "type": "long",
    "size": 13,
    "entryPrice": 1293.01,
    "exitPrice": 1377.11
  },
  {
    "id": 154,
    "ticker": "MSFT",
    "security": "Microsoft Corp",
    "type": "long",
    "size": 17,
    "entryPrice": 1500.77,
    "exitPrice": 1460.84
  },
  {
    "id": 155,
    "ticker": "NFLX",
    "security": "Netflix Inc",
    "type": "short",
    "size": 14,
    "entryPrice": 1124.22,
    "exitPrice": 1059.31,
    "stopLoss": 1070.27
  },
  {
    "id": 156,
    "ticker": "AMZN",
    "security": "Amazon.com Inc",
    "type": "long",
    "size": 7,
    "entryPrice": 1994.14,
    "exitPrice": 2001.76,
    "stopLoss": 1983.61
  },
  {
    "id": 157,
    "ticker": "NVDA",
    "security": "NVIDIA Corp",
    "type": "short",
    "size": 17,
    "entryPrice": 472.82,
    "exitPrice": 475.6,
    "stopLoss": 381.04
  },
  {
    "id": 158,
    "ticker": "META",
    "security": "Meta Platforms Inc",
    "type": "long",
    "size": 20,
    "entryPrice": 1545.85,
    "exitPrice": 1675.91
  },
  {
    "id": 159,
    "ticker": "AMD",
    "security": "Advanced Micro Devices Inc",
    "type": "long",
    "size": 3,
    "entryPrice": 259.44,
    "exitPrice": 181.64,
    "stopLoss": 173.6
  },
  {
    "id": 160,
    "ticker": "INTC",
    "security": "Intel Corp",
    "type": "long",
    "size": 7,
    "entryPrice": 223.87,
    "exitPrice": 373.48,
    "stopLoss": 204.3
  },
  {
    "id": 161,
    "ticker": "BABA",
    "security": "Alibaba Group Holding Ltd",
    "type": "short",
    "size": 9,
    "entryPrice": 1687.06,
    "exitPrice": 1645.33,
    "stopLoss": 1622.83
  },
  {
    "id": 162,
    "ticker": "ORCL",
    "security": "Oracle Corp",
    "type": "long",
    "size": 12,
    "entryPrice": 2433.12,
    "exitPrice": 2476.83,
    "stopLoss": 2422.4
  },
  {
    "id": 163,
    "ticker": "SAP",
    "security": "SAP SE",
    "type": "long",
    "size": 20,
    "entryPrice": 571.35,
    "exitPrice": 570.85,
    "stopLoss": 483.74
  },
  {
    "id": 164,
    "ticker": "UBER",
    "security": "Uber Technologies Inc",
    "type": "long",
    "size": 15,
    "entryPrice": 100.77,
    "exitPrice": 12.1
  },
  {
    "id": 165,
    "ticker": "LYFT",
    "security": "Lyft Inc",
    "type": "short",
    "size": 2,
    "entryPrice": 1675.44,
    "exitPrice": 1734.79
  },
  {
    "id": 166,
    "ticker": "SHOP",
    "security": "Shopify Inc",
    "type": "short",
    "size": 19,
    "entryPrice": 1751.16,
    "exitPrice": 1706.69
  },
  {
    "id": 167,
    "ticker": "SQ",
    "security": "Block Inc",
    "type": "long",
    "size": 20,
    "entryPrice": 1794.91,
    "exitPrice": 1876.09,
    "stopLoss": 1730.86
  },
  {
    "id": 168,
    "ticker": "PYPL",
    "security": "PayPal Holdings Inc",
    "type": "long",
    "size": 19,
    "entryPrice": 2259.05,
    "exitPrice": 2323.97,
    "stopLoss": 2222.05
  },
  {
    "id": 169,
    "ticker": "TWTR",
    "security": "Twitter Inc",
    "type": "short",
    "size": 13,
    "entryPrice": 361.83,
    "exitPrice": 478.79
  },
  {
    "id": 170,
    "ticker": "ZM",
    "security": "Zoom Video Communications Inc",
    "type": "long",
    "size": 17,
    "entryPrice": 2086.69,
    "exitPrice": 2003.94
  },
  {
    "id": 171,
    "ticker": "CRM",
    "security": "Salesforce Inc",
    "type": "short",
    "size": 15,
    "entryPrice": 54.52,
    "exitPrice": 184.98
  },
  {
    "id": 172,
    "ticker": "ADBE",
    "security": "Adobe Inc",
    "type": "long",
    "size": 2,
    "entryPrice": 2826.82,
    "exitPrice": 2764.67
  },
  {
    "id": 173,
    "ticker": "SPOT",
    "security": "Spotify Technology SA",
    "type": "short",
    "size": 13,
    "entryPrice": 1776.24,
    "exitPrice": 1719.01
  },
  {
    "id": 174,
    "ticker": "COIN",
    "security": "Coinbase Global Inc",
    "type": "short",
    "size": 6,
    "entryPrice": 1582.53,
    "exitPrice": 1731.06
  },
  {
    "id": 175,
    "ticker": "RBLX",
    "security": "Roblox Corp",
    "type": "short",
    "size": 2,
    "entryPrice": 558.73,
    "exitPrice": 554.67,
    "stopLoss": 493.48
  },
  {
    "id": 176,
    "ticker": "PLTR",
    "security": "Palantir Technologies Inc",
    "type": "short",
    "size": 20,
    "entryPrice": 79.5,
    "exitPrice": 66.57
  },
  {
    "id": 177,
    "ticker": "NET",
    "security": "Cloudflare Inc",
    "type": "short",
    "size": 18,
    "entryPrice": 2666.01,
    "exitPrice": 2733.63
  },
  {
    "id": 178,
    "ticker": "DOCU",
    "security": "DocuSign Inc",
    "type": "long",
    "size": 18,
    "entryPrice": 2976.51,
    "exitPrice": 2897.63
  },
  {
    "id": 179,
    "ticker": "SNOW",
    "security": "Snowflake Inc",
    "type": "long",
    "size": 12,
    "entryPrice": 304.34,
    "exitPrice": 337.84
  },
  {
    "id": 180,
    "ticker": "ASML",
    "security": "ASML Holding NV",
    "type": "long",
    "size": 13,
    "entryPrice": 2565.77,
    "exitPrice": 2714.87
  },
  {
    "id": 181,
    "ticker": "AAPL",
    "security": "Apple Inc",
    "type": "short",
    "size": 14,
    "entryPrice": 1439.63,
    "exitPrice": 1533.91,
    "stopLoss": 1382.44
  },
  {
    "id": 182,
    "ticker": "GOOGL",
    "security": "Alphabet Inc",
    "type": "short",
    "size": 3,
    "entryPrice": 568.3,
    "exitPrice": 660.89
  },
  {
    "id": 183,
    "ticker": "TSLA",
    "security": "Tesla Inc",
    "type": "short",
    "size": 4,
    "entryPrice": 447.04,
    "exitPrice": 546.36
  },
  {
    "id": 184,
    "ticker": "MSFT",
    "security": "Microsoft Corp",
    "type": "long",
    "size": 19,
    "entryPrice": 2039.63,
    "exitPrice": 2011.6,
    "stopLoss": 1985.55
  },
  {
    "id": 185,
    "ticker": "NFLX",
    "security": "Netflix Inc",
    "type": "long",
    "size": 9,
    "entryPrice": 2551.0,
    "exitPrice": 2572.78
  },
  {
    "id": 186,
    "ticker": "AMZN",
    "security": "Amazon.com Inc",
    "type": "short",
    "size": 11,
    "entryPrice": 2077.07,
    "exitPrice": 2158.85,
    "stopLoss": 2011.73
  },
  {
    "id": 187,
    "ticker": "NVDA",
    "security": "NVIDIA Corp",
    "type": "short",
    "size": 15,
    "entryPrice": 218.9,
    "exitPrice": 215.19
  },
  {
    "id": 188,
    "ticker": "META",
    "security": "Meta Platforms Inc",
    "type": "short",
    "size": 17,
    "entryPrice": 1446.34,
    "exitPrice": 1566.55,
    "stopLoss": 1370.41
  },
  {
    "id": 189,
    "ticker": "AMD",
    "security": "Advanced Micro Devices Inc",
    "type": "long",
    "size": 15,
    "entryPrice": 479.22,
    "exitPrice": 588.83,
    "stopLoss": 420.17
  },
  {
    "id": 190,
    "ticker": "INTC",
    "security": "Intel Corp",
    "type": "short",
    "size": 12,
    "entryPrice": 1389.69,
    "exitPrice": 1443.44,
    "stopLoss": 1315.69
  },
  {
    "id": 191,
    "ticker": "BABA",
    "security": "Alibaba Group Holding Ltd",
    "type": "short",
    "size": 4,
    "entryPrice": 1740.13,
    "exitPrice": 1668.28,
    "stopLoss": 1670.17
  },
  {
    "id": 192,
    "ticker": "ORCL",
    "security": "Oracle Corp",
    "type": "short",
    "size": 14,
    "entryPrice": 2582.19,
    "exitPrice": 2633.29
  },
  {
    "id": 193,
    "ticker": "SAP",
    "security": "SAP SE",
    "type": "long",
    "size": 15,
    "entryPrice": 665.19,
    "exitPrice": 729.87
  },
  {
    "id": 194,
    "ticker": "UBER",
    "security": "Uber Technologies Inc",
    "type": "long",
    "size": 8,
    "entryPrice": 1800.21,
    "exitPrice": 1938.06
  },
  {
    "id": 195,
    "ticker": "LYFT",
    "security": "Lyft Inc",
    "type": "long",
    "size": 13,
    "entryPrice": 1798.17,
    "exitPrice": 1924.83
  },
  {
    "id": 196,
    "ticker": "SHOP",
    "security": "Shopify Inc",
    "type": "short",
    "size": 6,
    "entryPrice": 307.7,
    "exitPrice": 337.53,
    "stopLoss": 244.34
  },
  {
    "id": 197,
    "ticker": "SQ",
    "security": "Block Inc",
    "type": "long",
    "size": 2,
    "entryPrice": 1360.78,
    "exitPrice": 1478.13
  },
  {
    "id": 198,
    "ticker": "PYPL",
    "security": "PayPal Holdings Inc",
    "type": "long",
    "size": 1,
    "entryPrice": 55.54,
    "exitPrice": 35.0,
    "stopLoss": 0.62
  },
  {
    "id": 199,
    "ticker": "TWTR",
    "security": "Twitter Inc",
    "type": "short",
    "size": 2,
    "entryPrice": 1920.61,
    "exitPrice": 1896.04,
    "stopLoss": 1888.35
  },
  {
    "id": 200,
    "ticker": "ZM",
    "security": "Zoom Video Communications Inc",
    "type": "long",
    "size": 2,
    "entryPrice": 2794.94,
    "exitPrice": 2736.67
  }
];

export default initialPositions;