function Authenticate(req,res,next){
    console.log("authenticating...");
    next();
}

module.exports = Authenticate;