import { GET, POST } from "@/app/api/positions/route";

// Mock the positionService
jest.mock("@/services/position-service", () => ({
    getAll: jest.fn(),
    add: jest.fn()
}));

import positionService from "@/services/position-service";

describe("API positions route", () => {
    describe("GET", () => {
        test("Should return positions with status 200", async () => {
            const mockPositions = [{ id: 1, ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 20, entryPrice: 150, exitPrice: 205, stopLoss: 130, strategyId: 1 }];
            positionService.getAll.mockResolvedValue(mockPositions);

            const request = new Request("http://localhost/api/positions");
            const response = await GET(request);

            expect(response.status).toBe(200);
            const data = await response.json();
            expect(data).toEqual(mockPositions);
        });

        test("Should return 500 on server error", async () => {
            positionService.getAll.mockRejectedValue(new Error("Server error"));

            const request = new Request("http://localhost/api/positions");
            const response = await GET(request);

            expect(response.status).toBe(500);
            const data = await response.json();
            expect(data).toEqual({ error: "Internal server error" });
        });
    });

    describe("POST", () => {
        test("Should add a position and return status 201", async () => {
            const newPosition = { ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 20, entryPrice: 150, exitPrice: 205, stopLoss: 130, strategyId: 1 };
            positionService.add.mockResolvedValue();

            const request = new Request("http://localhost/api/positions", {
                method: "POST",
                body: JSON.stringify(newPosition)
            });
            const response = await POST(request);

            expect(response.status).toBe(201);
            expect(positionService.add).toHaveBeenCalledWith(newPosition);
        });

        test("Should return 400 on validation error", async () => {
            const invalidPosition = { invalidField: "Invalid" };

            const request = new Request("http://localhost/api/positions", {
                method: "POST",
                body: JSON.stringify(invalidPosition)
            });
            const response = await POST(request);

            expect(response.status).toBe(400);
            const data = await response.json();
            expect(data.error).toBe("Validation error");
        });

        test("Should return 500 on server error", async () => {
            const newPosition = { ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 20, entryPrice: 150, exitPrice: 205, stopLoss: 130, strategyId: 1 };
            positionService.add.mockRejectedValue(new Error("Server error"));

            const request = new Request("http://localhost/api/positions", {
                method: "POST",
                body: JSON.stringify(newPosition)
            });
            const response = await POST(request);

            expect(response.status).toBe(500);
            const data = await response.json();
            expect(data).toEqual({ error: "Internal server error" });
        });
    });
});