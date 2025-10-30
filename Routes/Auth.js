const auth = require("../Controllers/AuthController");
const express = require("express");
const router = express.Router();
const userValid = require("../Validations/userValid");
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 60*15*1000,
    max: 10,
    message:"trop de tentative de connexion réesayer plus tard"
});

router.post("/register",userValid,auth.register);
router.post("/login", authLimiter, auth.login);

module.exports = router;