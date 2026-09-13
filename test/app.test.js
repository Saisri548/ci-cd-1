const request = require("supertest");
const app = require("../app");

describe("Task Manager API", () => {

    test("GET /health should return healthy status", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            status: "healthy"
        });
    });

    test("GET /api/tasks should return tasks", async () => {
        const response = await request(app)
            .get("/api/tasks");

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /health should return JSON", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.headers["content-type"]).toMatch(/json/);
    });

});
