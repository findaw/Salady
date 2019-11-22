module.exports  = (req,res)=>{
    
    if (req.signedCookies.token === req.app.get("userToken")){
        res.clearCookie("token");

        res.status(200).json({isSuccess:true});        
    }else{
        res.status(200).json({isSuccess:false});        
    }
    
}