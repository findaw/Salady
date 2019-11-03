
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

exports.joinMember = (req ,res)=>{
    let form = formidable.IncomingForm();
    form.parse(req, async(err, fields)=>{
        console.log(fields);
        let conn = null;
        try{
            conn = await pool.getConnection();
            await conn.beginTransaction();
            await conn.query("INSERT INTO member (id,pw,name,birth,gender,type,join_date) VALUES(?,?,?,?,?,1,now())",[fields.id,fields.pw,fields.name,fields.birth,fields.gender]);
            await conn.commit();

            res.status(200).send("Success...<script type='text/javascript'>location.href='/view/welcome';</script>");
        }catch(err){
            console.log(err);
            conn.rollback();

            res.status(200).send("Error...<script type='text/javascript'>alert('서버에러 발생');location.href='/view/join/member';</script>");
        }finally{
            if(conn){
                conn.release();
            }
        }
    });
}