const mysql = require("mysql2/promise");
const fs = require("fs");
let dbConf = null;
const isExists= fs.existsSync('./database.json');
if(isExists){
    let dbConfStr = fs.readFileSync("./database.json");
    dbConf = JSON.parse(dbConfStr);
}

const pool = mysql.createPool({
    host : process.env.dbHost || dbConf.host,
    user : process.env.dbUser  || dbConf.user,
    password : process.env.dbPW  || dbConf.password,
    database : process.env.dbName  || dbConf.database,
    connectionLimit:20,
    waitForConnections:false,
});

const connectDB = async ()=>{
    let conn = null;
    conn = await pool.getConnection();

    return conn;
}

module.exports = connectDB;