
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


exports.getIngreList = async ()=>{
    let conn = null;

    try{
        conn = await pool.getConnection();
        let [rows] = await conn.query("SELECT * FROM ingredient");
        
        return rows;    
    }catch(err){
        console.log(err.stack);
        return null;
    }finally{
        conn.release();
    }
}