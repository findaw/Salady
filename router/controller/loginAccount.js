
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

module.exports  =  (req ,res)=>{
    
    let form = formidable.IncomingForm();
    form.parse(req, async (err, fields)=>{
        console.log(fields);

        let conn = null;
        try{
            conn = await pool.getConnection();
            

            //첫번째인자에 결과값이 있음
            let [rows] = await conn.query("SELECT * FROM user WHERE id=? AND pw=?",[fields.id, fields.pw]);
            console.log(rows[0]);
            
            if(rows[0]){
                let obj = rows[0];
                console.log("일치");
                jwt.sign(
                    {
                        userNo : obj.no,
                        userId : obj.id,
                        userName : obj.name,
                        userType : obj.type
                    },
                    req.app.get("jwtSecret"),
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

                            req.app.set("userToken", token);
                    
                            res.locals.name = obj.name;
                            res.locals.type = obj.type;
                            console.log(fields.isChecked);

                            if(fields.isChecked === 'true'){
                                res.cookie("token", token, {
                                    expires: new Date(Date.now() + 24*60*60*1000 * 60), 
                                    httpOnly: true,
                                    signed : true,  
                                });
                            }else{
                                console.log("ㅇㅇ");
                                res.cookie("token", token, {
                                    httpOnly: true,
                                    signed : true,  
                                });
                            }
                           
                            res.status(250).json({
                                "isSuccess" : true,
                            });
                        }
                    }
                );

                
                
            }else{
                console.log("불일치");
                
                res.status(250).json({
                    "isSuccess" : false,
                });
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