const testPositions = [
  { id: 1, ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 10, entryPrice: 150, exitPrice: 165, stopLoss: 140, strategyId: 1 },
  { id: 2, ticker: 'GOOGL', security: 'Alphabet Inc', type: 'short', size: 5, entryPrice: 2800, exitPrice: 2600, stopLoss: 2850, strategyId: 2 },
  { id: 3, ticker: 'TSLA', security: 'Tesla Inc', type: 'long', size: 12, entryPrice: 700, exitPrice: 750, stopLoss: 670, strategyId: 3 },
  { id: 4, ticker: 'MSFT', security: 'Microsoft Corp', type: 'long', size: 20, entryPrice: 290, exitPrice: 305, strategyId: 4 },
  { id: 5, ticker: 'NFLX', security: 'Netflix Inc', type: 'short', size: 8, entryPrice: 550, exitPrice: 520, stopLoss: 570, strategyId: 5 },
  { id: 6, ticker: 'AMZN', security: 'Amazon.com Inc', type: 'long', size: 7, entryPrice: 3300, exitPrice: 3500, stopLoss: 3200, strategyId: 1 },
  { id: 7, ticker: 'NVDA', security: 'NVIDIA Corp', type: 'short', size: 6, entryPrice: 200, exitPrice: 190, strategyId: 2 },
  { id: 8, ticker: 'META', security: 'Meta Platforms Inc', type: 'long', size: 15, entryPrice: 180, exitPrice: 200, stopLoss: 170, strategyId: 3 },
  { id: 9, ticker: 'AMD', security: 'Advanced Micro Devices Inc', type: 'long', size: 11, entryPrice: 90, exitPrice: 100, stopLoss: 80, strategyId: 4 },
  { id: 10, ticker: 'INTC', security: 'Intel Corp', type: 'short', size: 9, entryPrice: 60, exitPrice: 55, stopLoss: 65, strategyId: 5 },
  { id: 11, ticker: 'BABA', security: 'Alibaba Group Holding Ltd', type: 'long', size: 14, entryPrice: 210, exitPrice: 240, strategyId: 1 },
  { id: 12, ticker: 'ORCL', security: 'Oracle Corp', type: 'long', size: 13, entryPrice: 80, exitPrice: 95, stopLoss: 75, strategyId: 2 },
  { id: 13, ticker: 'SAP', security: 'SAP SE', type: 'short', size: 4, entryPrice: 140, exitPrice: 130, strategyId: 3 },
  { id: 14, ticker: 'UBER', security: 'Uber Technologies Inc', type: 'long', size: 10, entryPrice: 45, exitPrice: 50, stopLoss: 40, strategyId: 4 },
  { id: 15, ticker: 'LYFT', security: 'Lyft Inc', type: 'short', size: 7, entryPrice: 35, exitPrice: 30, stopLoss: 37, strategyId: 5 },
  { id: 16, ticker: 'SHOP', security: 'Shopify Inc', type: 'long', size: 9, entryPrice: 1400, exitPrice: 1500, strategyId: 1 },
  { id: 17, ticker: 'SQ', security: 'Block Inc', type: 'long', size: 8, entryPrice: 250, exitPrice: 270, stopLoss: 240, strategyId: 2 },
  { id: 18, ticker: 'PYPL', security: 'PayPal Holdings Inc', type: 'short', size: 6, entryPrice: 180, exitPrice: 170, strategyId: 3 },
  { id: 19, ticker: 'TWTR', security: 'Twitter Inc', type: 'long', size: 12, entryPrice: 60, exitPrice: 75, stopLoss: 55, strategyId: 4 },
  { id: 20, ticker: 'ZM', security: 'Zoom Video Communications Inc', type: 'short', size: 5, entryPrice: 400, exitPrice: 350, stopLoss: 420, strategyId: 5 },
  { id: 21, ticker: 'CRM', security: 'Salesforce Inc', type: 'long', size: 10, entryPrice: 220, exitPrice: 235, strategyId: 1 },
  { id: 22, ticker: 'ADBE', security: 'Adobe Inc', type: 'short', size: 4, entryPrice: 550, exitPrice: 530, strategyId: 2 },
  { id: 23, ticker: 'SPOT', security: 'Spotify Technology SA', type: 'long', size: 11, entryPrice: 240, exitPrice: 260, strategyId: 3 },
  { id: 24, ticker: 'COIN', security: 'Coinbase Global Inc', type: 'short', size: 3, entryPrice: 300, exitPrice: 280, stopLoss: 310, strategyId: 4 },
  { id: 25, ticker: 'RBLX', security: 'Roblox Corp', type: 'long', size: 14, entryPrice: 90, exitPrice: 105, stopLoss: 85, strategyId: 5 },
  { id: 26, ticker: 'PLTR', security: 'Palantir Technologies Inc', type: 'long', size: 16, entryPrice: 25, exitPrice: 32, strategyId: 1 },
  { id: 27, ticker: 'NET', security: 'Cloudflare Inc', type: 'short', size: 7, entryPrice: 100, exitPrice: 90, strategyId: 2 },
  { id: 28, ticker: 'DOCU', security: 'DocuSign Inc', type: 'long', size: 6, entryPrice: 150, exitPrice: 165, stopLoss: 140, strategyId: 3 },
  { id: 29, ticker: 'SNOW', security: 'Snowflake Inc', type: 'short', size: 5, entryPrice: 300, exitPrice: 290, strategyId: 4 },
  { id: 30, ticker: 'ASML', security: 'ASML Holding NV', type: 'long', size: 10, entryPrice: 650, exitPrice: 700, stopLoss: 630, strategyId: 5 }
];

const testPositionsShort= [
  { id: 1, ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 10, entryPrice: 150, exitPrice: 165, stopLoss: 140, strategyId: 1 },
  { id: 2, ticker: 'GOOGL', security: 'Alphabet Inc', type: 'short', size: 5, entryPrice: 2800, exitPrice: 2600, stopLoss: 2850, strategyId: 1 },
  { id: 3, ticker: 'TSLA', security: 'Tesla Inc', type: 'long', size: 12, entryPrice: 700, exitPrice: 750, stopLoss: 670, strategyId: 1 },
  { id: 4, ticker: 'MSFT', security: 'Microsoft Corp', type: 'long', size: 20, entryPrice: 290, exitPrice: 305, strategyId: 1 },
  { id: 5, ticker: 'NFLX', security: 'Netflix Inc', type: 'short', size: 8, entryPrice: 550, exitPrice: 520, stopLoss: 570, strategyId: 1 }
];

export { testPositions, testPositionsShort };