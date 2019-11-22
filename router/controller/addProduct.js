const formidable  = require("formidable");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const makeImgName = require("./makeImgName.js");

 module.exports = (req,res)=>{
    let imgSrc = "";        //기본 이미지 이름
    let imgsSrc = "";       //상세페이지 이미지목록 이름
    let promoSrc = "";      //프로모션 이미지 이름
    let indgList = "";      //성분 목록 이름
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
            
            //이미지 배열(이미지 목록)
            if(files[key].length){
                files[key].forEach(file=>{
                    console.log(file.name);

                    if(file.size > 0){
                        let fileName = makeImgName(file.name, req.app.get("imgNameLength"));
                        let filePath = path.join(req.app.get("projectDir") + "/upload/img/" + fileName);
                        console.log(fileName);

                        fs.renameSync(file.path, filePath);
                        sharp(filePath).resize(150).toFile(path.join(req.app.get("projectDir") + "/upload/img/thumb/" + "150_" + fileName)).catch(err=>{console.log(err)});

                        
                        imgsSrc += fileName + ">>>";

                    }else{
                        fs.unlink(file.path, err=>{
                            if(err) console.log(err);
                        });
                    }
                });
            }
            //단일 이미지
            else{
                //console.log(files[key].name);
                if(files[key].size > 0){
                    console.log(key);
                    let fileName = makeImgName(files[key].name, req.app.get("imgNameLength"));
                    let filePath = path.join(req.app.get("projectDir") + "/upload/img/" + fileName);

                    fs.renameSync(files[key].path, filePath);
                    sharp(filePath).resize(150).toFile(path.join(req.app.get("projectDir") + "/upload/img/thumb/" + "150_" + fileName)).catch(err=>{console.log(err)});
                    
                    if(key=="promoImg"){
                        promoSrc = fileName;
                    }else if(key=="productImg"){
                        imgSrc =  fileName;
                    }
                }else{
                    fs.unlink(files[key].path, err=>{
                        if(err) console.log(err);
                    });
                }
            }
            
        }); 

        let conn = null;

        try{
            conn = await require("./connetDB.js")();
            //console.log([1, fields.name, fields.price, indgList, fields.desc, imgSrc, thumbSrc]);
            await conn.beginTransaction();
            console.log(res.locals);
            let result = await conn.query("INSERT INTO product(registered_date, seller_no, name, price, ingredients, description, img_src) VALUES(now(),?,?,?,?,?,?)"
            ,[res.locals.userNo, fields.name, fields.price, indgList, fields.desc, imgSrc]);
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
            res.status(200).send("Failed..<script type='text/javascript'>alert('오류가 발생했습니다');location.href='/view/manage'</script>");
            conn.rollback();
        }finally{
            conn.release();
        }
    
        

    });
}