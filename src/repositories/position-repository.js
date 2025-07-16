import prisma from '../../lib/prisma.js';

const positionRepository = {
    async getAll({ strategyId, page, limit, sortBy, order = 'asc', filters = {} } = {}) {
        const where = { strategyId };
        if (filters.type) where.type = filters.type;
        if (filters.stopLoss) where.stopLoss = { not: null };

        let [totalPositionsSize, positions] = await prisma.$transaction([
            prisma.position.count({ where }),
            prisma.position.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: sortBy ? { [sortBy]: order } : undefined,
            }),
        ]);

        const [ thresholds ] = await prisma.$queryRaw`
            SELECT
            percentile_cont(0.33) WITHIN GROUP (ORDER BY 
                CASE 
                    WHEN "stopLoss" IS NULL THEN 999999999 
                    ELSE abs("entryPrice" - "stopLoss") * size 
                END
            ) AS "lowThreshold",
            percentile_cont(0.67) WITHIN GROUP (ORDER BY 
                CASE 
                    WHEN "stopLoss" IS NULL THEN 999999999 
                    ELSE abs("entryPrice" - "stopLoss") * size 
                END
            ) AS "mediumThreshold"
            FROM "Position"
            WHERE "strategyId" = ${strategyId}
        `;

        positions = positions.map(p => {
            if (p.stopLoss === null) return { ...p, risk: 'high' };
            const riskValue = Math.abs(p.entryPrice - p.stopLoss) * p.size;
            let risk = 'low';
            if (riskValue > thresholds.mediumThreshold)  risk = 'high';
            else if (riskValue > thresholds.lowThreshold) risk = 'medium';
            return { ...p, risk };
        });

        return { data: positions, totalPositionsSize, totalPages: Math.ceil(totalPositionsSize / limit) };
    },

    async getById(id) {
        return prisma.position.findUnique({
            where: { id },
        });
    },

    async add(position) {
        return prisma.position.create({
            data: position,
        });
    },

    async update(newPosition) {
        return prisma.position.update({
            where: { id: newPosition.id },
            data: newPosition,
        });
    },

    async delete(id) {
        return prisma.position.delete({
            where: { id },
        });
    },

    async getRisksByIds(ids) {
        if (!ids || ids.length === 0) {
            return [];
        }

        const positions = await prisma.position.findMany({
            where: { id: { in: ids } },
        });

        if (positions.length === 0) {
            return [];
        }

        const strategyId = positions[0].strategyId;

        const [ thresholds ] = await prisma.$queryRaw`
            SELECT
            percentile_cont(0.33) WITHIN GROUP (ORDER BY 
                CASE 
                    WHEN "stopLoss" IS NULL THEN 999999999 
                    ELSE abs("entryPrice" - "stopLoss") * size 
                END
            ) AS "lowThreshold",
            percentile_cont(0.67) WITHIN GROUP (ORDER BY 
                CASE 
                    WHEN "stopLoss" IS NULL THEN 999999999 
                    ELSE abs("entryPrice" - "stopLoss") * size 
                END
            ) AS "mediumThreshold"
            FROM "Position"
            WHERE "strategyId" = ${strategyId}
        `;

        return positions.map(p => {
            if (p.stopLoss === null) {
                return { id: p.id, risk: 'high' };
            }
            const riskValue = Math.abs(p.entryPrice - p.stopLoss) * p.size;
            let risk = 'low';
            if (riskValue > thresholds.mediumThreshold) risk = 'high';
            else if (riskValue > thresholds.lowThreshold) risk = 'medium';
            return { id: p.id, risk };
        });
    }
};

export default positionRepository;
