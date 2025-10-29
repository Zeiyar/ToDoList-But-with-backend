const jwt = require("jsonwebtoken");
const blackList = new Map();

exports.addBlackList = (token) => {
    const {exp} = jwt.decode(token);
    if (exp) blackList.set(token,exp);
};

exports.hasBlacklist = (token) => blackList.has(token);

exports.clearBlackList = () =>{
    const now = Math.floor(Date.now()/1000);
    for (const [token,exp] in blackList.entries()){
        if(exp<now) blackList.delete(token);
    }
}

setInterval(() => {
  cleanBlacklist();
  console.log("🧹 Nettoyage automatique effectué !");
}, 1000 * 60 * 60 * 6);