

module.exports  = async (req, res)=>{

    console.log(req.body);
    let conn = null;
    let data = req.body;

    try{
        conn = await require("./connetDB.js")();
        await conn.beginTransaction();
        let col = "";
        if(data.key === "desc"){
            col = "description";
        }else if(data.key === "engName"){
            col = "eng_name";
        }
        else if(data.key === "name"){
            col = "name";
        }
        console.log(col);
        let [result] = await conn.query("UPDATE ingredient SET " + col + " = ? WHERE id= ?"
            , [data.data, data.id]);
            
        
        if(result.changedRows){
            await conn.commit();
        }else{
            throw new Error("SQL Error!");
        }
        
        res.status(200).json({isSuccess:true});

    }catch(err){
        console.log(err.stack);
        conn.rollback();
        res.status(200).json({isSuccess:false});
    }finally{
        conn.release();
    }
    
}