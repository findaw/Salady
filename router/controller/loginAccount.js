
const formidable  = require("formidable");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
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

exports.loginAccount =  (req ,res)=>{
    let form = formidable.IncomingForm();
    form.parse(req, async (err, fields)=>{
        //console.log(fields);
        let conn = null;
        try{
            conn = await pool.getConnection();
            

            //첫번째인자에 결과값이 있음
            let [rows] = await conn.query("SELECT * FROM user WHERE id=? AND pw=?",[fields.id, fields.pw]);
            //console.log(rows[0]);
            
            if(rows[0]){
                let obj = rows[0];
               // console.log(obj);
                jwt.sign(
                    {
                        userId : obj.id,
                        userName : obj.name,
                        userType : obj.type
                    },
                    req.app.get("secretKey"),
                    {
                        issuer : "salady",
                        expiresIn : "1d",
                        subject : "userInfo",
                        
                    },(err,token)=>{
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log(token);
                            req.app.set("userName", obj.name);
                            req.app.set("userType", obj.type);
                        }
                    }
                );

                res.status(200).send("Success...<script type='text/javascript'>alert('완료되었습니다.'); location.href='/';</script>");
            }else{
                res.status(200).send("Failed...<script type='text/javascript'>alert('일치하지 않습니다.'); history.back();</script>");        
            }
            
        }catch(err){
            console.log(err);
            res.status(500).send("Error...<script type='text/javascript'>alert('서버에러 발생');location.href='/'</script>");        
           
        }finally{
            if(conn){
                conn.release();
            }
        }
    });
}