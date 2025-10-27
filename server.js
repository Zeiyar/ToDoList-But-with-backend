require("dotenv").config();
const express = require("express");
const app = express();
const TodoRoad = require("./Routes/TodoCRUD")
const ErrorHandler = require("./Middleware/gererLesErreurs");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

if(!process.env.MONGO_URI){
    console.log(".env manquant");
    process.exit(1);
};

app.use(express.json());
app.use(helmet());
app.use(cors());

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}
else{
    app.use(morgan("combined"))
};

app.use("/todos",TodoRoad);
app.use(ErrorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log(`connected on mongoDb`))
    .catch((err)=>console.error("error :",err));

app.listen(process.env.PORT,()=>console.log(`server connected on http://localhost:${process.env.PORT}`)); 

