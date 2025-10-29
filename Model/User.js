const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["user","admin"],default:"user"},
    refreshToken:{type:String,default:null}
},{timestamps:true});

module.exports = mongoose.model("user",user)