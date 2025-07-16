import positionService from "@/services/position-service";
import { FullPositionSchema } from "@/validation/position-schema";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const options = Object.fromEntries(url.searchParams);
        if (options.filters) {
            try {
                options.filters = JSON.parse(options.filters);
            } catch {
                options.filters = {};
            }
        }

        options.strategyId = Number(options.strategyId);
        options.page = Number(options.page);
        options.limit = Number(options.limit);

        const positions = await positionService.getAll(options);
        return new Response(JSON.stringify(positions), { status: 200 });
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newPosition = await request.json();

        // Validate the position using Zod
        const validationResult = FullPositionSchema.safeParse(newPosition);
        if (!validationResult.success) {
            const errors = validationResult.error.errors.map(err => err.message);
            return new Response(JSON.stringify({ error: "Validation error", details: errors }), { status: 400 });
        }

        const addedPosition = await positionService.add(newPosition);
        return new Response(JSON.stringify(addedPosition), { status: 201 });
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
