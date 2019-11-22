const express = require("express");
const router = express.Router();
const path = require("path");


/*
     /view/manage
*/

router.get("/", (req, res)=>{
    res.status(200).render("manage",{});
});
router.get("/productAdd", (req, res)=>{
    res.status(200).render("productAdd",{});
});

module.exports = router;