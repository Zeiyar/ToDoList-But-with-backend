const mongoose = require("mongoose");

const todoItem = new mongoose.Schema({
    note:{type:String,required:true},
    done:{type:Boolean,default:false},
    category:{type:String,default:"new"},
},{timestamps:true});

module.exports = mongoose.model("todo",todoItem);