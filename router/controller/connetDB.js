const mysql = require("mysql2/promise");
const fs = require("fs");
const dbConfStr = fs.readFileSync("./database.json");
const dbConf = JSON.parse(dbConfStr);
const pool = mysql.createPool({
    host : process.db.dbHost,
    user : process.db.dbuser,
    password : process.dbPW,
    database : process.db.dbName,
    connectionLimit:20,
    waitForConnections:false,
});

const connectDB = async ()=>{
    let conn = null;
    conn = await pool.getConnection();

    return conn;
}

module.exports = connectDB;