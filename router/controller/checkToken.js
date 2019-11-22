
const jwt = require("jsonwebtoken");

module.exports  = (req,res,next)=>{
    console.log("router.js 1");
    console.log(req.signedCookies);
    if(req.signedCookies.token){
        let token = req.signedCookies.token;
        jwt.verify(token, req.app.get("jwtSecret"), (err, decoded)=>{
            if(err) {
                res.locals.name = "";
                res.locals.type = -1;
                res.clearCookie("token");
                throw Error("JWT Token Error : " + token);

            }else if(req.app.get("userToken") === null ){
                console.log(decoded);
                req.app.set("userToken", token);
            }
            res.locals.name = decoded.userName;
            res.locals.type = decoded.userType;
            
        });
    }else{
        res.locals.name = "";
        res.locals.type = -1;
    }


    next();
}