import positionService from "@/services/position-service";

export async function GET(request) {
    const url = new URL(request.url);
    const options = Object.fromEntries(url.searchParams);

    const positions = await positionService.getAll(options);
    return new Response(JSON.stringify(positions), { status: 200 });
}

export async function POST(request) {
    const newPosition = await request.json();
    await positionService.add(newPosition);
    return new Response("Position added successfully", { status: 201 });
}
