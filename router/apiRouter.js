const express = require("express");
const router = express.Router();
const formidable  = require("formidable");
const mysql = require("mysql2/promise");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dbConfStr = fs.readFileSync("./database.json");
const confStr = fs.readFileSync("./config.json");
const conf = JSON.parse(confStr);
const secretKey = conf.secretKey;
const dbConf = JSON.parse(dbConfStr);
const pool = mysql.createPool({
    host : dbConf.host,
    user : dbConf.user,
    password : dbConf.password,
    database : dbConf.database,
    connectionLimit:20,
    waitForConnections:false,
});

router.use(express.json());
router.use((req,res,next)=>{
    //console.log(req);
    next();
});
router.post("/check/join/:id", async(req,res)=>{
    let conn = null;
    try{
        conn = await pool.getConnection();
        let [row] = await conn.query("SELECT id FROM member WHERE id=?",[req.params.id]);
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
    

});
router.post("/join/member", (req ,res)=>{
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
            res.status(200).send("Error...<script type='text/javascript'>alert('서버에러 발생');location.href='/view/join/member';</script>");
        }finally{
            if(conn){
                conn.release();
            }
        }
    });
    
    
});

router.post("/login/account", (req ,res)=>{
    let form = formidable.IncomingForm();
    
    form.parse(req, async (err, fields)=>{
        //console.log(fields);
        let conn = null;
        try{
            conn = await pool.getConnection();
            

            //첫번째인자에 결과값이 있음
            let [rows] = await conn.query("SELECT * FROM member WHERE id=? AND pw=?",[fields.id, fields.pw]);
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
                    secretKey,
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
});

module.exports = router;