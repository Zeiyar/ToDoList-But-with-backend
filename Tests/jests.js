const request = require("supertest");
const express = require("express");
const app = express();
const todo = require("../Routes/TodoCRUD");

app.use(express.json());
app.use("/todoList",todo);

test("test todo rep doit être 200",async()=>{
    const res = await request(app).get("/todoList");
    expect(res.statusCode).toBe(200);
});

test("test todo 201 et tache completer",async()=>{
    const res = await request(app)
        .post("/todoList")
        .send({note:"jest test"});
    expect(res.statusCode).toBe(201);
    expect(res.body.note).toBe("jest test");
})

test("test pour recherche", async()=>{
    const res = await request(app)
        .get("/todoList/search?term=express")
    expect(res.statusCode).toBe(200);
    expect(res.body[0].note).toBe("learn faster express");
})