const express = require("express");

module.exports=(error,req,res,next)=>{
    console.error("Erreur serveur :", error.message);
    res.status(500).json({message : "Erreur interne du serveur"});
};