
const jwt = require("jsonwebtoken");

module.exports  = (req,res,next)=>{
    console.log("checkToken()");
    console.log(req.signedCookies);
    if(req.signedCookies.token){
        let token = req.signedCookies.token;
        jwt.verify(token, req.app.get("jwtSecret"), (err, decoded)=>{
            if(err) {
                res.locals.name = "";
                res.locals.type = -1;
                res.clearCookie("token");
                throw Error("JWT Token Error : " + token);

            }else{
                console.log(decoded);
                res.locals.name = decoded.userName;
                res.locals.type = decoded.userType;
                res.locals.userNo = decoded.userNo;
                res.locals.userId = decoded.userId;
            }
            
            next();
        });
    }else{
        res.locals.name = "";
        res.locals.type = -1;
        
        next();
    }

}