import initialPositions from '@/data/seed/initial-positions';

let positions = initialPositions;

export async function setPositions(newPositions) {
    positions = [...newPositions];
} 

const positionRepository = {
    async getAll({page = 1, limit = 5, sortBy, order = 'asc', filters = {}} = {}) {
        let results = [...positions];

        if (filters.type) {
            results = results.filter(position => position.type === filters.type);
        }

        //print filter to console in server
        console.log('Applying filters:', filters);

        if (filters.stopLoss) {
            results = results.filter(position => position.stopLoss != undefined && position.stopLoss !== null);
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
    }
};

export default positionRepository;