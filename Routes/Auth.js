const auth = require("../Controllers/AuthController");
const express = require("express");
const router = express.Router();
const userValid = require("../Validations/userValid")

router.post("/register",userValid,auth.register);
router.post("/login",auth.login);

module.exports = router;