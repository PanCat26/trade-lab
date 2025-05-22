const initialPositions = [
    {
        id: 1,
        ticker: 'AAPL',
        type: 'long',
        size: 10,
        entryPrice: 150,
        exitPrice: 170,
        stopLoss: null
    },
    {
        id: 2,
        ticker: 'GOOGL',
        type: 'short',
        size: 5,
        entryPrice: 2800,
        exitPrice: 2700,
        stopLoss: 2850
    },
    {
        id: 3,
        ticker: 'AMZN',
        type: 'long',
        size: 8,
        entryPrice: 3400,
        exitPrice: 3550,
        stopLoss: null
    }
];

export default initialPositions;