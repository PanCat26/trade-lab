import positionRepository from "@/repositories/position-repository";

const positionService = {
    async getAll(options = {}) {
        return positionRepository.getAll(options);
    },

    async getById(id) {
        return positionRepository.getById(id);
    },

    async add(position) {
        return positionRepository.add(position);
    },

    async update(newPosition) {
        positionRepository.update(newPosition);
    },

    async delete(id) {
        positionRepository.delete(id);
    },

    async getRisksByIds(ids) {
        return positionRepository.getRisksByIds(ids);
    }
};

export default positionService;