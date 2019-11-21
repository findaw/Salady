
const formidable  = require("formidable");
const mysql = require("mysql2/promise");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
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


exports.addProduct = (req,res)=>{
    let imgSrc = "";
    let thumbSrc = "";
    let imgsSrc = "";
    let promoSrc = "";
    let indgList = "";
    let form = formidable.IncomingForm();
    form.uploadDir = path.join(req.app.get("projectDir") + "/tmp");
    form.multiples = true; 
    form.parse(req, async (err, fields, files)=>{
        console.log("addProduct.js");
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

                        let filePath = path.join(req.app.get("projectDir") + "/upload/img/" + file.name);
                        fs.renameSync(file.path, filePath);
                        sharp(filePath).resize(150).toFile(path.join(req.app.get("projectDir") + "/upload/img/thumb/" + file.name)).catch(err=>{console.log(err)});
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

                    let filePath = path.join(req.app.get("projectDir") + "/upload/img/" + files[key].name);
                    fs.renameSync(files[key].path, filePath);
                    sharp(filePath).resize(150).toFile(path.join(req.app.get("projectDir") + "/upload/img/thumb/" + files[key].name)).catch(err=>{console.log(err)});
                    
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
}