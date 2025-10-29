const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {addBlackList} = require("../Utils/blackList");

exports.register = async(req,res,next)=>{
    try{
        const {email,password,username,role} = req.body;
        if (!email||!password||!username) return res.status(400).json({message: "terme manquant"});

        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({message : "utilisateur déjà créer veuillez vous connectez"});
        
        const newPassword = await bcrypt.hash(password,10);
        const user = await User.create({email,password: newPassword,username,role});

        return res.status(201).json({
            message: `utilisateur créer avec succès :`,
            user:{ id : user._id , username : user.username , email : user.email, role }
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

        if (user.refreshToken) {
            addBlackList(user.refreshToken);
        }

        const token = await jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn:"15m" },
        )

        const refreshToken = await jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET_REFRESH,
            {expiresIn: "7d"},
        )
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            message : `Bienvenu a bord ${user.username}`,
            accessToken : token,
            refreshToken
        });
    }catch(err){
        next(err);
    }
};

exports.refresh = async(req,res,next)=>{
    try{
        const {refreshToken} = req.body;
        if (!refreshToken) return res.status(404).json({message : "token manquant"});

        const decoded = jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH);
        const user = await User.findById(decoded.id);
        if (!user||user.refreshToken!==refreshToken){
            return res.status(403).json({message: "token invalide"});
        }

        const newAccessToken = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "15m"},
        );
        res.status(201).json({newAccessToken});
    }catch(err){
        next(err);
    }
};

exports.logout = async(req,res,next)=>{
    try{
        const {refreshToken} = req.body;
        if (!refreshToken) return res.status(404).json({message : "token manquant"});

        const decoded = jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH);
        const user = await User.findById(decoded.id);
        if (!user||user.refreshToken!==refreshToken){
            return res.status(403).json({message: "token invalide"});
        }

        addBlackList(refreshToken);

        user.refreshToken = null;
        await user.save();
        res.status(200).json({message :"deconnexion bien effectué"});
    }catch(err){
        next(err);
    }
};