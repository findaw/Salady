const express = require("express");
const router = express.Router();
const path = require("path");


router.use(express.static("client/public"));

router.get("/login", (req, res)=>{
    res.status(200).render("login");
});

router.get("/join", (req, res)=>{
    res.status(200).render("join",{"type":"member"});
});
router.get("/join/member", (req, res)=>{
    res.status(200).render("joinMember",{"type":"member"});
});
router.get("/welcome", (req, res)=>{
    res.status(200).render("welcome",{"type":"member"});
});
router.get("/product", (req, res)=>{
    res.status(200).render("product",{"type":"member"});
});
router.get("/manage", (req, res)=>{
    res.status(200).render("manage",{"type":"member"});
});
router.get("/productDetail", (req, res)=>{
    res.status(200).render("productDetail",{"type":"member"});
});
router.get("/shoppingCart", (req, res)=>{
    res.status(200).render("shoppingCart",{"type":"member"});
});
router.get("/member", (req, res)=>{
    res.status(200).render("member",{"type":"member"});
});

module.exports = router;
