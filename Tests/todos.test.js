const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {
  await request(app)
    .post("/auth/register")
    .send({
      username :"JestUser",
      email: "jestuser@test.com",
      password: "Password123!",
    });
  const res = await request(app)
    .post("/auth/login")
    .send({
      email: "jestuser@test.com",
      password: "Password123!",
    });
  token = res.body.accessToken;
});

describe(" Todo CRUD ",()=>{
    it("Doit créer une tache",async()=>{
        const res = await request(app)
            .post("/todos/add")
            .set("Authorization",`Bearer ${token}`)
            .send({ note:"jest test" });
        expect(res.statusCode).toBe(201);
    });
    it("Doit refuser car sans token",async()=>{
        const res = await request(app).get("/todos");
        expect(res.statusCode).toBe(401);
    });
});