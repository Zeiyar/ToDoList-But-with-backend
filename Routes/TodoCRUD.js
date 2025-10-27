const express = require("express");
const router = express.Router();
const controller = require("../Controllers/TodoController");
const valid = require("../Validations/joiValid");
const searchValid = require("../Validations/searchValid");

router.get("/",controller.getTodo)
router.post("/add",valid, controller.createTodo);
router.put("/modify/:id",controller.updateTodo);
router.delete("/delete/:id",controller.deleteTodo);
router.get("/search",searchValid, controller.searchTodo);

module.exports = router;