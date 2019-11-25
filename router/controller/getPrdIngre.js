
module.exports = async (to=0,from=30) =>{
    let conn = null;

    try{
        conn = await require("./connetDB.js")();
        let [rows] = await conn.query("SELECT p.id, seller_no, u.name seller, registered_date, p.name, ingredients, price, description, img_src FROM product p, user u WHERE p.seller_no = u.no LIMIT ?, ?",
        [to,from]);

        let [ingres] = await conn.query("SELECT id, name, eng_name FROM ingredient");
        ingreList = [];

        ingres.forEach(item=>{
            if(item){
                ingreList[item.id] = {"name":item.name, "engName" : item.eng_name};
            }
        });

        //console.log(ingreList);
        if(rows){
            rows.forEach(item=>{
                item.ingreList = [];

                item.ingredients.split(">").forEach(id=>{
                    if(id.trim() !== ""){
                        //console.log(id);
                        item.ingreList.push(ingreList[id]);
                    }
                    
                });
                //console.log(item.ingreList);
            })
        }
        
        return {"product": rows, "ingredient" : ingres};
    }catch(err){
        console.log(err);
    }finally{
        conn.release();
    }
}