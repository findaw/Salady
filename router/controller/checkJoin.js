const formidable  = require("formidable");
const mysql = require("mysql2/promise");
const fs = require("fs");
const dbConfStr = fs.readFileSync("./database.json");
const dbConf = JSON.parse(dbConfStr);
const pool = mysql.createPool({
    host : dbConf.host,
    user : dbConf.user,
    password : dbConf.password,
    database : dbConf.database,
    connectionLimit:20,
    waitForConnections:false,
});

exports.checkJoin = async(req,res)=>{
    let conn = null;
    try{
        conn = await pool.getConnection();
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