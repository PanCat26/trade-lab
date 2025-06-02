import positionRepository,  { setPositions } from '@/repositories/position-repository.js';
import { testPositions, testPositionsShort }  from '@/data/seed/test-positions.js';

describe('Position Repository', () => {

    beforeEach(async () => {
        await setPositions([...testPositions]);
    });

    test('getAll with default options should return positions with default pagination', async () => {
        const result = await positionRepository.getAll();
        expect(result.data.length).toBe(5);
        expect(result.totalPages).toBe(6);
    });

    test('getAll with custom pagination parameters should return paginated results', async () => {
        const result = await positionRepository.getAll({ page: 1, limit: 2 });
        expect(result.data.length).toBe(2);
        expect(result.totalPages).toBe(15);
    });

    test('getAll with ascending size sorting criteria should return results sorted ascendingly by size', async () => {
        const result = await positionRepository.getAll({ sortBy: 'size', order: 'asc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeLessThanOrEqual(result.data[i + 1].size);
        }
    });

    test('getAll with descending size sorting criteria should return results sorted descendingly by size', async () => {
        const result = await positionRepository.getAll({ sortBy: 'size', order: 'desc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeGreaterThanOrEqual(result.data[i + 1].size);
        }
    });

    test('getAll with ascending entry price sorting criteria should return results sorted ascendingly by entry price', async () => {
        const result = await positionRepository.getAll({ sortBy: 'entryPrice', order: 'asc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].entryPrice).toBeLessThanOrEqual(result.data[i + 1].entryPrice);
        }
    });

    test('getAll with type filter should return only positions of the specified type', async () => {
        const result = await positionRepository.getAll({ filters: { type: 'long' }, limit: 100 });

        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getAll with type filter and ascending size sorting criteria should return only positions of the specified type sorted ascendingly by size', async () => {
        const result = await positionRepository.getAll({ filters: { type: 'long' }, sortBy: 'size', order: 'asc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeLessThanOrEqual(result.data[i + 1].size);
        }

        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getAll with type filter and ascending id sorting criteria should return only positions of the specified type sorted ascendingly by id', async () => {
        const result = await positionRepository.getAll({ filters: { type: 'long' }, sortBy: 'id', order: 'asc', limit: 100 });
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].id).toBeLessThanOrEqual(result.data[i + 1].id);
        }
        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getAll with stop loss filter should return only positions with stop loss defined', async () => {
        const result = await positionRepository.getAll({ filters: { stopLoss: true }, limit: 100 });
        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.stopLoss).toBeDefined();
        }); 
    });

    test('getAll with stop loss filter and descending size sorting criteria should return only positions with stop loss defined sorted desscendingly by size', async () => {
        const result = await positionRepository.getAll({ filters: { stopLoss: true }, sortBy: 'size', order: 'desc', limit: 100 });
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeGreaterThanOrEqual(result.data[i + 1].size);
        }
        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.stopLoss).toBeDefined();
        });
    });

    test('getAll with stop loss filter and ascending id sorting criteria should return only positions with stop loss defined sorted ascendingly by id', async () => {
        const result = await positionRepository.getAll({ filters: { stopLoss: true }, sortBy: 'id', order: 'asc', limit: 100 });
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].id).toBeLessThanOrEqual(result.data[i + 1].id);
        }
        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.stopLoss).toBeDefined();
        });
    });

    //risk tests

    test('getAll should return high risk for positions with undefined stop losses', async () => {
        const result = await positionRepository.getAll({ limit: 100 });
        expect(result.data.length).toBe(30);
        result.data.forEach(position => {
            if (position.stopLoss === undefined) {
                expect(position.risk).toBe('high');
            }
        });
    });

    test('getAll should compute risks correctly', async () => {
        await setPositions([...testPositionsShort]);
        const result = await positionRepository.getAll({ limit: 5 });
        expect(result.data.length).toBe(5);
        expect(result.data[0].risk).toBe('low');
        expect(result.data[1].risk).toBe('medium');
        expect(result.data[2].risk).toBe('medium');
        expect(result.data[3].risk).toBe('high');
        expect(result.data[4].risk).toBe('low');
    });

    test('getById should return the correct position', async () => {
        const result = await positionRepository.getById(6);
        expect(result).toEqual(testPositions[5]);
    });

    test('getById should return null for non-existing ID', async () => {
        const result = await positionRepository.getById(999);
        expect(result).toBeNull();
    });

    test('add should add a new position and return it', async () => {
        const newPosition = { ticker: 'AAPL', type: 'long', size: 10, entryPrice: 150, exitPrice: 165, stopLoss: 140 };
        const result = await positionRepository.add(newPosition);
        expect(result).toEqual({ id: 31, ...newPosition });
        expect((await positionRepository.getAll({})).totalPositions).toBe(31);
    });

    test('update should modify an existing position', async () => {
        const updatedPosition = { id: 1, ticker: 'MSFT', type: 'long', size: 20, entryPrice: 150, exitPrice: 165 };
        await positionRepository.update(updatedPosition);
        const result = await positionRepository.getById(1);
        expect(result).toEqual(updatedPosition);
    });

    test('update should throw an error for non-existing ID', async () => {
        const updatedPosition = { id: 999, ticker: 'MSFT', type: 'long', size: 20, entryPrice: 150, exitPrice: 165 };
        await expect(positionRepository.update(updatedPosition)).rejects.toThrow(`Position with ID ${updatedPosition.id} not found`);
    });

    test('delete should remove an existing position', async () => {
        await positionRepository.delete(1);
        const result = await positionRepository.getById(1);
        expect(result).toBeNull();
        expect((await positionRepository.getAll({})).totalPositions).toBe(29);
    });
    
    test('delete should throw an error for non-existing ID', async () => {
        await expect(positionRepository.delete(999)).rejects.toThrow(`Position with ID 999 not found`);
    });

    test('getRisksByIds should return risks for specified IDs', async () => {
        await setPositions([...testPositionsShort]);
        const risks = await positionRepository.getRisksByIds([1, 2, 3, 4, 5]);
        expect(risks.length).toBe(5);
        expect(risks[0].risk).toBe('low');
        expect(risks[1].risk).toBe('medium');
        expect(risks[2].risk).toBe('medium');
        expect(risks[3].risk).toBe('high');
        expect(risks[4].risk).toBe('low');
    });
});