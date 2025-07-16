import { execSync } from 'child_process';
import dotenv from 'dotenv';
import prisma from '../../lib/prisma.js';
import positionRepository from '@/repositories/position-repository';
import { testPositions, testPositionsShort } from '@/data/test/test-positions';

dotenv.config({ path: '.env.test' });

describe('Position Repository', () => {
    beforeAll(() => {
        execSync('npx prisma db push', { stdio: 'inherit' });
    });
    
    beforeEach(async () => {
        await prisma.$executeRawUnsafe(`
            TRUNCATE TABLE "Position", "Strategy" RESTART IDENTITY CASCADE
        `);
        
        // Create strategies for test data
        for (let i = 1; i <= 5; i++) {
            await prisma.strategy.create({
                data: { 
                    name: `Strategy ${i}`,
                    createdAt: new Date()
                }
            });
        }
        
        // Insert test positions
        for (const position of testPositions) {
            const { id, ...rest } = position;
            await prisma.position.create({
                data: rest
            });
        }
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    test('getAll with custom pagination parameters should return paginated results', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 2 });
        expect(result.data.length).toBe(2);
        expect(result.totalPages).toBe(3);
    });

    test('getAll with ascending size sorting criteria should return results sorted ascendingly by size', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, sortBy: 'size', order: 'asc' });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeLessThanOrEqual(result.data[i + 1].size);
        }
    });

    test('getAll with descending size sorting criteria should return results sorted descendingly by size', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, sortBy: 'size', order: 'desc' });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeGreaterThanOrEqual(result.data[i + 1].size);
        }
    });

    test('getAll with ascending entry price sorting criteria should return results sorted ascendingly by entry price', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, sortBy: 'entryPrice', order: 'asc' });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].entryPrice).toBeLessThanOrEqual(result.data[i + 1].entryPrice);
        }
    });

    test('getAll with type filter should return only positions of the specified type', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, filters: { type: 'long' } });

        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getAll with type filter and ascending size sorting criteria should return only positions of the specified type sorted ascendingly by size', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, filters: { type: 'long' }, sortBy: 'size', order: 'asc' });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeLessThanOrEqual(result.data[i + 1].size);
        }

        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getAll with type filter and ascending id sorting criteria should return only positions of the specified type sorted ascendingly by id', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, filters: { type: 'long' }, sortBy: 'id', order: 'asc' });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].id).toBeLessThanOrEqual(result.data[i + 1].id);
        }
        
        result.data.forEach(position => {
            expect(position.type).toBe('long');
        });
    });

    test('getAll with stop loss filter should return only positions with stop loss defined', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, filters: { stopLoss: true } });
        
        result.data.forEach(position => {
            expect(position.stopLoss).not.toBeNull();
        }); 
    });

    test('getAll with stop loss filter and descending size sorting criteria should return only positions with stop loss defined sorted descendingly by size', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, filters: { stopLoss: true }, sortBy: 'size', order: 'desc' });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].size).toBeGreaterThanOrEqual(result.data[i + 1].size);
        }
        
        result.data.forEach(position => {
            expect(position.stopLoss).not.toBeNull();
        });
    });

    test('getAll with stop loss filter and ascending id sorting criteria should return only positions with stop loss defined sorted ascendingly by id', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10, filters: { stopLoss: true }, sortBy: 'id', order: 'asc' });
        
        for (let i = 0; i < result.data.length - 1; i++) {
            expect(result.data[i].id).toBeLessThanOrEqual(result.data[i + 1].id);
        }
        
        result.data.forEach(position => {
            expect(position.stopLoss).not.toBeNull();
        });
    });

    // Risk tests
    test('getAll should return high risk for positions with null stop losses', async () => {
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 10 });
        
        result.data.forEach(position => {
            if (position.stopLoss === null) {
                expect(position.risk).toBe('high');
            }
        });
    });

    test('getAll should compute risks correctly', async () => {
        // Clear and insert short test data
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Position" RESTART IDENTITY CASCADE`);
        
        for (const position of testPositionsShort) {
            const { id, ...rest } = position;
            await prisma.position.create({
                data: rest
            });
        }
        
        const result = await positionRepository.getAll({ strategyId: 1, page: 1, limit: 5 });
        expect(result.data.length).toBe(1); // Only position with strategyId: 1
        expect(result.data[0].risk).toBe('low');
    });

    test('getById should return the correct position', async () => {
        const result = await positionRepository.getById(6);
        expect(result.id).toBe(6);
        expect(result.ticker).toBe('AMZN');
    });

    test('getById should return null for non-existing ID', async () => {
        const result = await positionRepository.getById(999);
        expect(result).toBeNull();
    });

    test('add should add a new position and return it', async () => {
        const newPosition = { 
            ticker: 'AAPL', 
            security: 'Apple Inc',
            type: 'long', 
            size: 10, 
            entryPrice: 150, 
            exitPrice: 165, 
            stopLoss: 140, 
            strategyId: 1 
        };
        
        const result = await positionRepository.add(newPosition);
        expect(result.ticker).toBe('AAPL');
        expect(result.strategyId).toBe(1);
        
        const retrieved = await positionRepository.getById(result.id);
        expect(retrieved).toBeTruthy();
    });

    test('update should modify an existing position', async () => {
        const updatedPosition = { 
            id: 1, 
            ticker: 'MSFT', 
            security: 'Microsoft Corp',
            type: 'long', 
            size: 20, 
            entryPrice: 150, 
            exitPrice: 165,
            strategyId: 1
        };
        
        await positionRepository.update(updatedPosition);
        const result = await positionRepository.getById(1);
        expect(result.ticker).toBe('MSFT');
        expect(result.size).toBe(20);
    });

    test('update should throw an error for non-existing ID', async () => {
        const updatedPosition = { 
            id: 999, 
            ticker: 'MSFT', 
            security: 'Microsoft Corp',
            type: 'long', 
            size: 20, 
            entryPrice: 150, 
            exitPrice: 165,
            strategyId: 1
        };
        
        await expect(positionRepository.update(updatedPosition)).rejects.toThrow();
    });

    test('delete should remove an existing position', async () => {
        await positionRepository.delete(1);
        const result = await positionRepository.getById(1);
        expect(result).toBeNull();
    });
    
    test('delete should throw an error for non-existing ID', async () => {
        await expect(positionRepository.delete(999)).rejects.toThrow();
    });

    test('getRisksByIds should return risks for specified IDs', async () => {
        // Clear and insert short test data
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Position" RESTART IDENTITY CASCADE`);
        
        for (const position of testPositionsShort) {
            const { id, ...rest } = position;
            await prisma.position.create({
                data: rest
            });
        }
        
        const risks = await positionRepository.getRisksByIds([1, 2, 3, 4, 5]);
        expect(risks.length).toBe(5);
        expect(risks[0].risk).toBeDefined();
        expect(risks[1].risk).toBeDefined();
        expect(risks[2].risk).toBeDefined();
        expect(risks[3].risk).toBeDefined();
        expect(risks[4].risk).toBeDefined();
    });

    test('getRisksByIds should return empty array for empty input', async () => {
        const risks = await positionRepository.getRisksByIds([]);
        expect(risks).toEqual([]);
    });

    test('getRisksByIds should return empty array for non-existing IDs', async () => {
        const risks = await positionRepository.getRisksByIds([999, 998]);
        expect(risks).toEqual([]);
    });
});