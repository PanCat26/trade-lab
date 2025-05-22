import initialPositions from '@/data/seed/initialPositions';

let positions = initialPositions;

export function setPositions(newPositions) {
    positions = [...newPositions];
} 

const positionRepository = {
    getAll({page = 1, limit = 5, sortBy, order = 'asc', filters = {}} = {}) {
        let results = [...positions];

        results = results.filter(position =>
            Object.entries(filters).every(([key, value]) => position[key] === value)
        );

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
            totalPages: totalPages
        };
    },

    getById(id) {
        return positions.find(position => position.id === id) || null;
    },

    add(position) {
        const maxId = positions.reduce((maxId, pos) => Math.max(maxId, pos.id), 1);
        const newPosition = {id: maxId + 1, ...position};
        positions.push(newPosition);
        return { ...newPosition };
    },

    update(newPosition) {
        const existingPosition = positions.find(position => position.id === newPosition.id);
        if (!existingPosition) throw new Error(`Position with ID ${newPosition.id} not found`);
        
        Object.assign(existingPosition, newPosition);
    },

    delete(id) {
        const exists = positions.some(position => position.id === id);
        if (!exists) {
            throw new Error(`Position with ID ${id} not found`);
        }

        positions = positions.filter(p => p.id !== id);
    }
}

export default positionRepository;