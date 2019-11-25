

module.exports  = async(req,res)=>{
    let conn = null;
    try{
        conn = await require("./connetDB.js")();
        let [row] = await conn.query("SELECT id FROM user WHERE id=?",[req.params.id]);
        console.log(row[0]);
        //no result => undefined 
        if(row[0]){
            res.status(250).json({"isExist":true});
        }else{
            res.status(200).json({"isExist":false});
        }

    }catch(err){
        console.log(err);
    }finally{
        if(conn){
            conn.release();
        }
    }
}