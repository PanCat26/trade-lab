const positionProxy = {
    async getAll(options = {}) {
        const response = await fetch(`/api/positions?${new URLSearchParams({...options, filters: JSON.stringify(options.filters || {})})}`);
        if (!response.ok) {
            const responseBody = await response.json();
            throw { type: responseBody.error, details: responseBody.details || [] }; 
        }
        return response.json();
    },

    async getById(id) {
        const response = await fetch(`/api/positions/${id}`);
        if (!response.ok) {
            const responseBody = await response.json();
            throw { type: responseBody.error, details: responseBody.details || [] };
        }
        return response.json();
    },

    async add(position) {
        const response = await fetch(`/api/positions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(position)
        });
        if (!response.ok) {
            const responseBody = await response.json();
            throw { type: responseBody.error, details: responseBody.details || [] };
        }
        return response.json();
    },

    async update(newPosition) {
        const response = await fetch(`/api/positions/${newPosition.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPosition)
        });
        if (!response.ok) {
            const responseBody = await response.json();
            throw { type: responseBody.error, details: responseBody.details || [] };
        }
    },

    async delete(id) {
        const response = await fetch(`/api/positions/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const responseBody = await response.json();
            throw { type: responseBody.error, details: responseBody.details || [] };
        }
    },

    async getRisksByIds(ids) {
        const response = await fetch(`/api/positions/risks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids })
        });
        if (!response.ok) {
            const responseBody = await response.json();
            throw { type: responseBody.error, details: responseBody.details || [] };
        }
        return response.json();
    }
};

export default positionProxy;