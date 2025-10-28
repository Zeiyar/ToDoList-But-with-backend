const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async(req,res,next)=>{
    try{
        const {email,password,username} = req.body;
        if (!email||!password||!username) return res.status(400).json({message: "terme manquant"});

        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({message : "utilisateur déjà créer veuillez vous connectez"});
        
        const newPassword = await bcrypt.hash(password,10);
        const user = await User.create({email,password: newPassword,username});

        return res.status(201).json({
            message: `utilisateur créer avec succès :`,
            user:{ id : user._id , username : user.username , email : user.email }
        });

    }catch(err){
        next(err);
    }
};

exports.login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password) return res.status(400).json({message : "pas d email ou de mot de passe entrée"});
        
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: "pas d utilisateur correspondant"});

        const hashed = await bcrypt.compare(password,user.password);
        if (!hashed) return res.status(401).json({message : "le mot de passe ne correspond pas"});

        const token = await jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn:"1h" },
        )

        return res.status(200).json({
            message : `Bienvenu a bord ${user.username}`,
            token
        });
    }catch(err){
        next(err);
    }
};