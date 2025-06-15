import positionService from "@/services/position-service";
import { FullPositionSchema } from "@/validation/position-schema";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const position = await positionService.getById(id);

        if (!position) {
            return new Response(JSON.stringify({ error: "Position not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(position), { status: 200 });
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const position = await positionService.getById(id);
        if (!position) {
            return new Response(JSON.stringify({ error: "Position not found" }), { status: 404 });
        }

        await positionService.delete(id);
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const updatedPosition = await request.json();

        // Validate the updated position using Zod
        const validationResult = FullPositionSchema.safeParse(updatedPosition);
        if (!validationResult.success) {
            const errors = validationResult.error.errors.map(err => err.message);
            return new Response(JSON.stringify({ error: "Validation error", details: errors }), { status: 400 });
        }

        await positionService.update({ id, ...updatedPosition });
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
