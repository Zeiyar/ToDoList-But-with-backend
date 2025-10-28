const express = require("express");
const router = express.Router();
const controller = require("../Controllers/TodoController");
const valid = require("../Validations/joiValid");
const searchValid = require("../Validations/searchValid");
const auth = require("../Middleware/jwt")

router.get("/",auth,controller.getTodo)
router.post("/add",auth,valid, controller.createTodo);
router.put("/modify/:id",auth,controller.updateTodo);
router.delete("/delete/:id",auth,controller.deleteTodo);
router.get("/search",auth,searchValid, controller.searchTodo);

router.get("/userInfo",auth,controller.getUserInfo);

module.exports = router;