module.exports  = (req,res)=>{
    
    res.clearCookie("token");

    res.send(200).json({isSuccess:true});
}