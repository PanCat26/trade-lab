import positionService from "@/services/position-service.js";

const positionProxy = {
    getAll(options = {}) {
        return positionService.getAll(options);
    },

    getById(id) {
        return positionService.getById(id);
    },

    add(position) {
        return positionService.add(position);
    },

    update(newPosition) {
        positionService.update(newPosition);
    },

    delete(id) {
        positionService.delete(id);
    }
};

export default positionProxy;