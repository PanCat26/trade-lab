import positionRepository,  { setPositions } from '@/repositories/position-repository.js';
import testPositions from '@/data/seed/test-positions.js';

describe('Position Repository', () => {

    beforeEach(() => {
        setPositions([...testPositions]);
    });

    test('getAll with default options should return positions with default pagination', () => {
        const result = positionRepository.getAll();
        expect(result.data.length).toBe(5);
        expect(result.totalPages).toBe(6);
    });

    test('getAll with custom pagination parameters should return paginated results', () => {
        const result = positionRepository.getAll({ page: 1, limit: 2 });
        expect(result.data.length).toBe(2);
        expect(result.totalPages).toBe(15);
    });

    test('getAll with ascending size sorting criteria should return results sorted ascendingly by size', () => {
        const result = positionRepository.getAll({ sortBy: 'size', order: 'asc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeLessThanOrEqual(result.data[i + 1].size);
        }
    });

    test('getAll with descending size sorting criteria should return results sorted descendingly by size', () => {
        const result = positionRepository.getAll({ sortBy: 'size', order: 'desc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeGreaterThanOrEqual(result.data[i + 1].size);
        }
    });

    test('getAll with ascending entry price sorting criteria should return results sorted ascendingly by entry price', () => {
        const result = positionRepository.getAll({ sortBy: 'entryPrice', order: 'asc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].entryPrice).toBeLessThanOrEqual(result.data[i + 1].entryPrice);
        }
    });

    test('getAll with type filter should return only positions of the specified type', () => {
        const result = positionRepository.getAll({ filters: { type: 'long' }, limit: 100 });

        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getAll with type filter and ascending size sorting criteria should return only positions of the specified type sorted ascendingly by size', () => {
        const result = positionRepository.getAll({ filters: { type: 'long' }, sortBy: 'size', order: 'asc', limit: 100 });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeLessThanOrEqual(result.data[i + 1].size);
        }

        expect(result.data.length).toBe(18);
        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getById should return the correct position', () => {
        const result = positionRepository.getById(6);
        expect(result).toEqual(testPositions[5]);
    });

    test('getById should return null for non-existing ID', () => {
        const result = positionRepository.getById(999);
        expect(result).toBeNull();
    });

    test('add should add a new position and return it', () => {
        const newPosition = { ticker: 'AAPL', type: 'long', size: 10, entryPrice: 150, exitPrice: 165, stopLoss: 140 };
        const result = positionRepository.add(newPosition);
        expect(result).toEqual({ id: 31, ...newPosition });
        expect(positionRepository.getAll({}).totalPositions).toBe(31);
    });

    test('update should modify an existing position', () => {
        const updatedPosition = { id: 1, ticker: 'MSFT', type: 'long', size: 20, entryPrice: 150, exitPrice: 165 };
        positionRepository.update(updatedPosition);
        const result = positionRepository.getById(1);
        expect(result).toEqual(updatedPosition);
    });

    test('update should throw an error for non-existing ID', () => {
        const updatedPosition = { id: 999, ticker: 'MSFT', type: 'long', size: 20, entryPrice: 150, exitPrice: 165 };
        expect(() => positionRepository.update(updatedPosition)).toThrow(`Position with ID ${updatedPosition.id} not found`);
    });

    test('delete should remove an existing position', () => {
        positionRepository.delete(1);
        const result = positionRepository.getById(1);
        expect(result).toBeNull();
        expect(positionRepository.getAll({}).totalPositions).toBe(29);
    });
    
    test('delete should throw an error for non-existing ID', () => {
        expect(() => positionRepository.delete(999)).toThrow(`Position with ID 999 not found`);
    });
});