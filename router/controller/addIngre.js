const formidable  = require("formidable");

module.exports  = (req, res) =>{
    let form = formidable.IncomingForm();

    form.parse(req, async (err, fields, files)=>{
        console.log(fields);

        
        let conn = null


        try{
            conn = await require("./connetDB.js")();
            await conn.beginTransaction();
            let result = await conn.query("INSERT INTO ingredient(name, eng_name, description) VALUES(?,?,?)"
            ,[fields.name, fields.engName, fields.desc]);
            console.log(result);
            res.status(200).send("Success..<script type='text/javascript'>alert('등록되었습니다.');location.href='/admin'</script>");
            await conn.commit();
        }catch(err){
            console.log(err);
            res.status(200).send("Failed..<script type='text/javascript'>alert('실패하였습니다.');location.href='/admin'</script>");
            conn.rollback();
        }finally{
            conn.release();
        }
    });


}