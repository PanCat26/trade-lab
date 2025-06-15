import positionService from "@/services/position-service";

export async function POST(request) {
    try {
        const body = await request.json();
        const { ids } = body;

        const risks = await positionService.getRisksByIds(ids);
        return new Response(JSON.stringify(risks), { status: 200 });
    } catch (error) {
        console.error("Server error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
