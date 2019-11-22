const express = require("express");
const router = express.Router();
const path = require("path");



router.use(express.static("client/public"));

/*
     /admin/
*/

router.get("/", (req, res)=>{
    res.status(200).render("admin",{});
});
router.get("/ingredientAdd", (req, res)=>{
    res.status(200).render("ingreAdd",{});
});
router.get("/ingredientView", async (req, res)=>{
    let data = await require("./controller/getIngreList.js")();
    console.log(data);
    res.status(200).render("ingreView",{data: data});
});



module.exports = router;