require("dotenv").config();
const express = require("express");
const app = express();
const ErrorHandler = require("./Middleware/gererLesErreurs");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const TodoRoad = require("./Routes/TodoCRUD");
const AuthRoad = require("./Routes/Auth");

if(!process.env.MONGO_URI){
    console.log(".env manquant");
    process.exit(1);
};

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: "trop de rêquete, réesayer plus tard",
});
app.use(limiter);

app.disable("x-powered-by");

app.use(helmet());
app.use(cors({
    origin:[`http://localhost:3000`,"https://monsiteplustard.com"], //origin autorisé
    methods: ["POST","PUT","DELETE","GET"], //method autorisé
    allowedHeaders: ["Authorization","Content-Type"], //type de header autorisé
    credentials: true, //cookies autorisé
}));
app.use(express.json());

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}
else{
    app.use(morgan("combined"))
};

app.use("/todos",TodoRoad);
app.use("/auth",AuthRoad);

app.use(ErrorHandler);


module.exports = app;