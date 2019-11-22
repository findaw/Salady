const express = require("express");
const router = express.Router();


/*
     /view/manage
*/

router.get("/", (req, res)=>{
    res.status(200).render("manage",{});
});
router.get("/productAdd", async (req, res)=>{
    const rows = await require("../controller/getIngreList.js")();
    data = rows.map(item=>{
        return {"id" : item.id, "name" : item.name}
    });
    console.log(data);
    res.status(200).render("productAdd",{data:data});
});

module.exports = router;