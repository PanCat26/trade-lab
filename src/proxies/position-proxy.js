import positionService from "@/services/position-service.js";

const positionProxy = {
    async getAll(options = {}) {
        return positionService.getAll(options);
    },

    async getById(id) {
        return positionService.getById(id);
    },

    async add(position) {
        return positionService.add(position);
    },

    async update(newPosition) {
        positionService.update(newPosition);
    },

    async delete(id) {
        positionService.delete(id);
    },

    async getRisksByIds(ids) {
        return positionService.getRisksByIds(ids);
    }
};

export default positionProxy;