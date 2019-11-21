const express = require("express");
const router = express.Router();
const path = require("path");



router.use(express.static("client/public"));

/*
     /admin/
*/

router.get("/", (req, res)=>{
    res.status(200).render("admin",{...req.app.get("defaultOption")});
});
router.get("/ingredientAdd", (req, res)=>{
    res.status(200).render("ingreAdd",{...req.app.get("defaultOption")});
});
router.get("/ingredientView", async (req, res)=>{
    let data = await require("./controller/getIngreList").getIngreList();
    console.log(data);
    res.status(200).render("ingreView",{...req.app.get("defaultOption"),
        data: data});
});



module.exports = router;