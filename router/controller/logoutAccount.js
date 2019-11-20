exports.logoutAccount = (req,res)=>{
    let token = req.headers["x-access-token"];
    
    if (token === req.app.get("userToken")){
        console.log(token);
        require("./setDefaultOption.js").setDefaultOption(req.app, {name:"", type:-1});

        res.status(200).json({isSuccess:true});        
    }else{
        res.status(200).json({isSuccess:false});        
    }
    
}