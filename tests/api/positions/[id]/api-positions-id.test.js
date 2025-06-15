import { GET, DELETE, PATCH } from "@/app/api/positions/[id]/route";

// Mock the positionService
jest.mock("@/services/position-service", () => ({
    getById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
}));

import positionService from "@/services/position-service";

describe("Positions/[id] API", () => {
    describe("GET", () => {
        test("Should return a position with status 200", async () => {
            const mockPosition = { id: "1", ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 20, entryPrice: 150, exitPrice: 105, stopLoss: 130 };
            positionService.getById.mockResolvedValue(mockPosition);

            const request = new Request("http://localhost/api/positions/1");
            const response = await GET(request, { params: { id: "1" } });

            expect(response.status).toBe(200);
            const data = await response.json();
            expect(data).toEqual(mockPosition);
        });

        test("Should return 404 if position is not found", async () => {
            positionService.getById.mockResolvedValue(null);

            const request = new Request("http://localhost/api/positions/1");
            const response = await GET(request, { params: { id: "1" } });

            expect(response.status).toBe(404);
            const data = await response.json();
            expect(data).toEqual({ error: "Position not found" });
        });

        test("Should return 500 on server error", async () => {
            positionService.getById.mockRejectedValue(new Error("Server error"));

            const request = new Request("http://localhost/api/positions/1");
            const response = await GET(request, { params: { id: "1" } });

            expect(response.status).toBe(500);
            const data = await response.json();
            expect(data).toEqual({ error: "Internal server error" });
        });
    });

    describe("DELETE", () => {
        test("Should delete a position and return status 204", async () => {
            const mockPosition = { id: "1", ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 20, entryPrice: 150, exitPrice: 105, stopLoss: 130 };
            positionService.getById.mockResolvedValue(mockPosition);
            positionService.delete.mockResolvedValue();

            const request = new Request("http://localhost/api/positions/1", { method: "DELETE" });
            const response = await DELETE(request, { params: { id: "1" } });

            expect(response.status).toBe(204);
            expect(positionService.delete).toHaveBeenCalledWith("1");
        });

        test("Should return 404 if position is not found", async () => {
            positionService.getById.mockResolvedValue(null);

            const request = new Request("http://localhost/api/positions/1", { method: "DELETE" });
            const response = await DELETE(request, { params: { id: "1" } });

            expect(response.status).toBe(404);
            const data = await response.json();
            expect(data).toEqual({ error: "Position not found" });
        });

        test("Should return 500 on server error", async () => {
            positionService.getById.mockRejectedValue(new Error("Server error"));

            const request = new Request("http://localhost/api/positions/1", { method: "DELETE" });
            const response = await DELETE(request, { params: { id: "1" } });

            expect(response.status).toBe(500);
            const data = await response.json();
            expect(data).toEqual({ error: "Internal server error" });
        });
    });

    describe("PATCH", () => {
        test("Should update a position and return status 200", async () => {
            const updatedPosition = { ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 20, entryPrice: 150, exitPrice: 105, stopLoss: 130 };
            positionService.update.mockResolvedValue();

            const request = new Request("http://localhost/api/positions/1", {
                method: "PATCH",
                body: JSON.stringify(updatedPosition)
            });
            const response = await PATCH(request, { params: { id: "1" } });

            expect(response.status).toBe(200);
            expect(positionService.update).toHaveBeenCalledWith({ id: "1", ...updatedPosition });
        });

        test("Should return 400 on validation error", async () => {
            const invalidPosition = { invalidField: "Invalid" };

            const request = new Request("http://localhost/api/positions/1", {
                method: "PATCH",
                body: JSON.stringify(invalidPosition)
            });
            const response = await PATCH(request, { params: { id: "1" } });

            expect(response.status).toBe(400);
            const data = await response.json();
            expect(data.error).toBe("Validation error");
        });

        test("Should return 500 on server error", async () => {
            const updatedPosition = { ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 20, entryPrice: 150, exitPrice: 105, stopLoss: 130 };
            positionService.update.mockRejectedValue(new Error("Server error"));

            const request = new Request("http://localhost/api/positions/1", {
                method: "PATCH",
                body: JSON.stringify(updatedPosition)
            });
            const response = await PATCH(request, { params: { id: "1" } });

            expect(response.status).toBe(500);
            const data = await response.json();
            expect(data).toEqual({ error: "Internal server error" });
        });
    });
});