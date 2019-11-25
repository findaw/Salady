const express = require("express");
const router = express.Router();
const path = require("path");


/*
     /view/join
*/

router.get("/", (req, res)=>{
    res.status(200).render("joinType",{});
});
router.get("/member", (req, res)=>{
    res.status(200).render("joinMember",{});
});
router.get("/seller", (req, res)=>{
    res.status(200).render("joinSeller",{});
});


module.exports = router;