const jwt = require("jsonwebtoken");

module.exports = async(req,res,next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({message : "accès refusé"});

        const decoded = await jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }catch(err){
        console.error("Erreur JWT:", err.message);
        res.status(401).json({message : "token invalide ou introuvable"});
    }
}