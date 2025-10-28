require("dotenv").config();
const express = require("express");
const app = express();
const ErrorHandler = require("./Middleware/gererLesErreurs");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const TodoRoad = require("./Routes/TodoCRUD");
const AuthRoad = require("./Routes/Auth");

if(!process.env.MONGO_URI){
    console.log(".env manquant");
    process.exit(1);
};

app.use(helmet());
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}
else{
    app.use(morgan("combined"))
};

app.use("/todos",TodoRoad);
app.use("/auth",AuthRoad);

app.use("")
app.use(ErrorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log(`connected on mongoDb`))
    .catch((err)=>console.error("error :",err));

app.listen(process.env.PORT,()=>console.log(`server connected on https://todolist-but-with-backend.onrender.com`)); 

