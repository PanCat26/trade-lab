import { POST } from "@/app/api/positions/risks/route";

// Mock the positionService
jest.mock("@/services/position-service", () => ({
    getRisksByIds: jest.fn()
}));

import positionService from "@/services/position-service";

describe("Positions/Risks API", () => {
    describe("POST", () => {
        it("Should return risks with status 200", async () => {
            const mockRisks = [
                { id: "1", risk: "low" },
                { id: "2", risk: "medium" },
                { id: "3", risk: "high" }
            ];
            positionService.getRisksByIds.mockResolvedValue(mockRisks);

            const request = new Request("http://localhost/api/positions/risks", {
                method: "POST",
                body: JSON.stringify({ ids: ["1", "2", "3"] })
            });
            const response = await POST(request);

            expect(response.status).toBe(200);
            const data = await response.json();
            expect(data).toEqual(mockRisks);
        });

        it("Should return 500 on server error", async () => {
            positionService.getRisksByIds.mockRejectedValue(new Error("Server error"));

            const request = new Request("http://localhost/api/positions/risks", {
                method: "POST",
                body: JSON.stringify({ ids: ["1", "2", "3"] })
            });
            const response = await POST(request);

            expect(response.status).toBe(500);
            const data = await response.json();
            expect(data).toEqual({ error: "Internal server error" });
        });
    });
});