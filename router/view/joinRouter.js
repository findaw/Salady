const express = require("express");
const router = express.Router();
const path = require("path");


/*
     /view/join
*/

router.get("/", (req, res)=>{
    res.status(200).render("joinType",{...req.app.get("defaultOption")});
});
router.get("/member", (req, res)=>{
    res.status(200).render("joinMember",{...req.app.get("defaultOption")});
});
router.get("/seller", (req, res)=>{
    res.status(200).render("joinSeller",{...req.app.get("defaultOption")});
});


module.exports = router;