const formidable  = require("formidable");

module.exports  = (req ,res)=>{
    let userType = 2;
    let form = formidable.IncomingForm();

    form.parse(req, async(err, fields)=>{
        console.log(fields);
        let conn = null;
        try{
            conn = await require("./connetDB.js")();
            await conn.beginTransaction();
            await conn.query("INSERT INTO user (id,pw,name,type,join_date) VALUES(?,?,?,?,now())",[fields.id,fields.pw,fields.name, userType]);
            
            let [row] = await conn.query("SELECT no FROM user ORDER BY no DESC LIMIT 1");
            console.log(row[0].no);
            await conn.query("INSERT INTO seller (no,seller_no) VALUES(?,?)",[row[0].no, fields.sellerNo]);

            await conn.commit();

            res.status(200).send("Success...<script type='text/javascript'>location.href='/view/welcome';</script>");
        }catch(err){
            console.log(err);
            conn.rollback();

            res.status(200).send("Error...<script type='text/javascript'>alert('서버에러 발생');location.href='/view/join/seller';</script>");
        }finally{
            if(conn){
                conn.release();
            }
        }
    });
}