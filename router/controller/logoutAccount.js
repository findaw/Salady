module.exports  = (req,res)=>{
    
    res.clearCookie("token");

    res.status(200).json({isSuccess:true});
}