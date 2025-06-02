import initialPositions from '@/data/seed/initial-positions';

let positions = initialPositions;

export async function setPositions(newPositions) {
    positions = [...newPositions];
} 

const positionRepository = {
    async getAll({page = 1, limit = 20, sortBy, order = 'asc', filters = {}, noPagination = false} = {}) {
        let results = [...positions];

        if (filters.type) {
            results = results.filter(position => position.type === filters.type);
        }

        if (filters.stopLoss) {
            results = results.filter(position => position.stopLoss != undefined);
        }

        if (sortBy) {
            results.sort((firstPosition, secondPosition) => {
                const firstVal = firstPosition[sortBy];
                const secondVal = secondPosition[sortBy];
                if (firstVal < secondVal) return order === 'asc' ? -1 : 1;
                if (firstVal > secondVal) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        if (noPagination) {
            return {
                data: results,
                totalPositions: results.length,
                totalPages: 1
            };
        }

        const allRisks = positions.map(position =>
            (position.stopLoss === null || position.stopLoss === undefined)
                ? Number.POSITIVE_INFINITY
                : Math.abs(position.entryPrice - position.stopLoss) * position.size
        );
        const sortedRisks = [...allRisks].sort((a, b) => a - b);
        const n = sortedRisks.length;
        const lowThreshold = sortedRisks[Math.floor(n / 3)] ?? 0;
        const medThreshold = sortedRisks[Math.floor((n * 2) / 3)] ?? 0;

        results = results.map(position => {
            if (position.stopLoss === null || position.stopLoss === undefined) {
                return { ...position, risk: 'high' };
            }
            const riskValue = Math.abs(position.entryPrice - position.stopLoss) * position.size;
            let risk = 'low';
            if (riskValue > medThreshold) risk = 'high';
            else if (riskValue > lowThreshold) risk = 'medium';
            return { ...position, risk };
        });

        const totalPositions = results.length;
        const totalPages = Math.ceil(totalPositions / limit);
        const startIndex = (page - 1) * limit;
        results = results.slice(startIndex, startIndex + limit);

        return {
            data: results,
            totalPositions: totalPositions,
            totalPages: totalPages
        };
    },

    async getById(id) {
        return positions.find(position => position.id === id) || null;
    },

    async add(position) {
        const maxId = positions.reduce((maxId, pos) => Math.max(maxId, pos.id), 1);
        const newPosition = {id: maxId + 1, ...position};
        positions.push(newPosition);
        return { ...newPosition };
    },

    async update(newPosition) {
        const existingPosition = positions.find(position => position.id === newPosition.id);
        if (!existingPosition) throw new Error(`Position with ID ${newPosition.id} not found`);
        
        Object.keys(existingPosition).forEach(key => delete existingPosition[key]);
        Object.assign(existingPosition, newPosition);
    },

    async delete(id) {
        const exists = positions.some(position => position.id === id);
        if (!exists) {
            throw new Error(`Position with ID ${id} not found`);
        }

        positions = positions.filter(p => p.id !== id);
    },

    async getRisksByIds(ids) {
        const idSet = new Set(ids);
        const filteredPositions = positions.filter(position => idSet.has(position.id));

        const riskValues = positions.map(position =>
            (position.stopLoss == null || position.stopLoss === undefined)
                ? Number.POSITIVE_INFINITY
                : Math.abs(position.entryPrice - position.stopLoss) * position.size
        );

        const sorted = [...riskValues].sort((a, b) => a - b);
        const n = sorted.length;
        const lowThreshold = sorted[Math.floor(n / 3)] ?? 0;
        const medThreshold = sorted[Math.floor((2 * n) / 3)] ?? 0;

        console.log('low', lowThreshold, 'med', medThreshold);

        return filteredPositions.map(position => {
            const riskValue = (position.stopLoss == null || position.stopLoss === undefined)
                ? Number.POSITIVE_INFINITY
                : Math.abs(position.entryPrice - position.stopLoss) * position.size;

            let risk = 'low';
            if (riskValue > medThreshold) risk = 'high';
            else if (riskValue > lowThreshold) risk = 'medium';

            return { id: position.id, risk };
        });
    }
};

export default positionRepository;