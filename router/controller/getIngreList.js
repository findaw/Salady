
module.exports  = async ()=>{
    let conn = null;
    try{    
        conn = await require("./connetDB.js")();
        let [rows] = await conn.query("SELECT * FROM ingredient");
        return rows;    
    }catch(err){
        console.log(err.stack);
        return null;
    }finally{
        conn.release();
    }
}