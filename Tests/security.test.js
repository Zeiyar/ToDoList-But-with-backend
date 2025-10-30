const app = require("../app");
const request = require("supertest");

describe("Sécurité API",()=>{
    it("Helmet Présent",async()=>{
        const res = await request(app)
            .get("/todos")
        expect(res.headers["x-powered-by"]).toBeUndefined();
    });
    it("Rate limit fonctionne (trop de requêtes)",async()=>{
        for (let i = 0; i < 11; i++) {
            await request(app)
                .post("/auth/login")
                .send({ email: "jestuser@test.com", password: "Password13!" });
    }
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "jestuser@test.com", password: "Password13!" });
        expect(res.statusCode).toBe(429);
    });
    it("CORS est configuré", async () => {
        const res = await request(app)
            .options("/todos")
            .set("Origin", "http://localhost:3000");
        expect(res.statusCode).toBe(204); // préflight OK
    });
});