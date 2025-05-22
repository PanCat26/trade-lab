import positionRepository from "@/repositories/positionRepository";

const positionService = {
    getAll(options = {}) {
        return positionRepository.getAll(options);
    },

    getById(id) {
        return positionRepository.getById(id);
    },

    add(position) {
        return positionRepository.add(position);
    },

    update(newPosition) {
        positionRepository.update(newPosition);
    },

    delete(id) {
        positionRepository.delete(id);
    }
}

export default positionService;