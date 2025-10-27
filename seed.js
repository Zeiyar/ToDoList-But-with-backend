require("dotenv").config();
const mongoose = require("mongoose");
const todo = require("./Model/TodoModel");

const seedData = [
    { note: "Learn Express.js", category: "learn", done: false },
    { note: "Practice MongoDB", category: "learn", done: false },
    { note: "Do some cardio", category: "sport", done: false },
    { note: "Read a book", category: "relax", done: false },
    { note: "Write an API", category: "code", done: true },
    { note: "Watch a tech video", category: "relax", done: false },
];

const mode = process.argv[2];

const connectAndSeed = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo connected");

        if (mode==="clear"){
            await todo.deleteMany({});
            console.log("many has been deleted");
        }
        
        if (mode==="fill"){
            await todo.deleteMany({});
            await todo.insertMany(seedData);
            console.log("insert has been manysed");
        }
        
        mongoose.connection.close();
        console.log("disconnected");
    }catch(err){
        console.error(err);
    }
}

connectAndSeed();