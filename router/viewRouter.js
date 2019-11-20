const express = require("express");
const router = express.Router();
const path = require("path");


router.use(express.static("client/public"));

router.get("/login", (req, res)=>{
    res.status(200).render("login");
});

router.get("/join", (req, res)=>{
    res.status(200).render("joinType",{...req.app.get("defaultOption")});
});
router.get("/join/member", (req, res)=>{
    res.status(200).render("joinMember",{...req.app.get("defaultOption")});
});
router.get("/join/seller", (req, res)=>{
    res.status(200).render("joinSeller",{...req.app.get("defaultOption")});
});
router.get("/welcome", (req, res)=>{
    res.status(200).render("welcome",{...req.app.get("defaultOption")});
});
router.get("/product", (req, res)=>{
    res.status(200).render("product",{...req.app.get("defaultOption")});
});
router.get("/productAdd", (req, res)=>{
    res.status(200).render("productAdd",{...req.app.get("defaultOption")});
});
router.get("/manage", (req, res)=>{
    res.status(200).render("manage",{...req.app.get("defaultOption")});
});
router.get("/productDetail", (req, res)=>{
    res.status(200).render("productDetail",{...req.app.get("defaultOption")});
});
router.get("/shoppingCart", (req, res)=>{
    res.status(200).render("shoppingCart",{...req.app.get("defaultOption")});
});
router.get("/member", (req, res)=>{
    res.status(200).render("member",{...req.app.get("defaultOption")});
});

module.exports = router;
