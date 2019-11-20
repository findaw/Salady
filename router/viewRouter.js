const express = require("express");
const router = express.Router();
const path = require("path");


router.use(express.static("client/public"));

router.get("/login", (req, res)=>{
    res.status(200).render("login");
});

router.get("/join", (req, res)=>{
    res.status(200).render("joinType",{"type":req.app.get("userType")});
});
router.get("/join/member", (req, res)=>{
    res.status(200).render("joinMember",{"type":req.app.get("userType")});
});
router.get("/join/seller", (req, res)=>{
    res.status(200).render("joinSeller",{"type":req.app.get("userType")});
});
router.get("/welcome", (req, res)=>{
    res.status(200).render("welcome",{"type":req.app.get("userType")});
});
router.get("/product", (req, res)=>{
    res.status(200).render("product",{"type":req.app.get("userType")});
});
router.get("/productAdd", (req, res)=>{
    res.status(200).render("productAdd",{"type":req.app.get("userType")});
});
router.get("/manage", (req, res)=>{
    res.status(200).render("manage",{"type":req.app.get("userType")});
});
router.get("/productDetail", (req, res)=>{
    res.status(200).render("productDetail",{"type":req.app.get("userType")});
});
router.get("/shoppingCart", (req, res)=>{
    res.status(200).render("shoppingCart",{"type":req.app.get("userType")});
});
router.get("/member", (req, res)=>{
    res.status(200).render("member", {"type":req.app.get("userType")});
});

module.exports = router;
