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
const path = require("path");

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


router.post("/add/product", (req,res)=>{
    let imgSrc = "";
    let thumbSrc = "";
    let imgsSrc = "";
    let promoSrc = "";
    let indgList = "";
    let form = formidable.IncomingForm();
    form.uploadDir = path.join(req.app.get("projectDir") + "/tmp");
    form.multiples = true; 
    form.parse(req, async (err, fields, files)=>{
        console.log(fields);
        
        Object.keys(fields).forEach(key=>{
            if(/indg/.test(key)){
                indgList += key.replace(/[a-z]/gi,"") + ">";
            }
        })
        Object.keys(files).forEach(key=>{
            
            if(files[key].length){
                files[key].forEach(file=>{
                    console.log(file.name);
                    if(file.size > 0){
                        imgsSrc += file.name + ">>>";
                        fs.renameSync(file.path, path.join(req.app.get("projectDir") + "/upload/img/" + file.name));
                    }else{
                        fs.unlink(file.path, err=>{
                            if(err) console.log(err);
                        });
                    }
                });
            }else{
                //console.log(files[key].name);
                if(files[key].size > 0){
                    console.log(key);
                    if(key=="promoImg"){
                        promoSrc = files[key].name
                        console.log(files[key].name);
                    }else if(key=="productImg"){
                        imgSrc =  files[key].name 
                        console.log(files[key].name);
                    }
                    imgsSrc += files[key].name + ">>>";
                    fs.renameSync(files[key].path, path.join(req.app.get("projectDir") + "/upload/img/" + files[key].name));
                }else{
                    fs.unlink(files[key].path, err=>{
                        if(err) console.log(err);
                    });
                }
            }
            
        }); 

        let conn = await pool.getConnection();

        try{
           
            //console.log([1, fields.name, fields.price, indgList, fields.desc, imgSrc, thumbSrc]);
            await conn.beginTransaction();
            let result = await conn.query("INSERT INTO product(registered_date, seller_id, name, price, ingredients, description, img_src, thumb_src) VALUES(now(),?,?,?,?,?,?,?)"
            ,[1, fields.name, fields.price, indgList, fields.desc, imgSrc, thumbSrc]);
            console.log(result);

            let [row] = await conn.query("SELECT id FROM product ORDER BY id DESC LIMIT 1");
            
            console.log([row[0].id, fields.volume, fields.volumeUnit, fields.takeDate, fields.takeDateUnit, fields.allergy, fields.guide, fields.take, promoSrc, imgsSrc]);
            result = await conn.query("INSERT INTO product_detail(product_id, volume, volume_unit, take_date, take_date_unit, allergy_desc, guide_desc, take_desc,promo_src, imgs_src) VALUES(?,?,?,?,?,?,?,?,?,?)"
            ,[row[0].id, fields.volume, fields.volumeUnit, fields.takeDate, fields.takeDateUnit, fields.allergy, fields.guide, fields.take, promoSrc, imgsSrc]);
            console.log(result);

            await conn.commit();
            res.status(200).send("Success..<script type='text/javascript'>alert('등록되었습니다.');location.href='/view/manage'</script>");
        }catch(err){
            console.log(err);
            res.status(200).send("Failed..<script type='text/javascript'>alert('오류가 발생했습니다');</script>");
            conn.rollback();
        }finally{
            conn.release();
        }
    
        

    });
    
});


module.exports = router;