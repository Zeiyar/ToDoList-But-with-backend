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

describe("Authentification",()=>{

    it("Doit refuser un login avec mauvais mot de passe",async()=>{
        const res = await request(app)
            .post("/auth/login")
            .send({email : "wrongEmail@gmail.com", password : "wrongPassword"});
        expect(res.statusCode).toBe(404);
    });

    it("Doit créer un nouvel utilisateur",async()=>{
        const res = await request(app)
            .post("/auth/register")
            .send({
        username: "JestUser",
        email: "jestusera@test.com",
        password: "Password123!",
      });
      expect(res.statusCode).toBe(201);
    });

    it("Doit se connecter et retourner un token",async()=>{
        await request(app).post("/auth/register").send({
            username: "JestUser",
            email: "jestuser@test.com",
            password: "Password123!",
        })
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "jestuser@test.com",
                password: "Password123!",
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("accessToken");
    });
});