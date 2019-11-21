const express = require("express");
const router = express.Router();
const path = require("path");


/*
     /view/manage
*/

router.get("/", (req, res)=>{
    res.status(200).render("manage",{...req.app.get("defaultOption")});
});
router.get("/productAdd", (req, res)=>{
    res.status(200).render("productAdd",{...req.app.get("defaultOption")});
});

module.exports = router;