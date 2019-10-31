const express = require("express");
const router = express.Router();
const path = require("path");


router.use(express.static("client/public"));

router.get("/login", (req, res)=>{
    res.status(200).render("login");
});

router.get("/join", (req, res)=>{
    res.status(200).render("join");
});
router.get("/join/member", (req, res)=>{
    res.status(200).render("joinMember");
});
router.get("/welcome", (req, res)=>{
    res.status(200).render("welcome");
});
router.get("/product", (req, res)=>{
    res.status(200).render("product");
});
router.get("/manage", (req, res)=>{
    res.status(200).render("manage");
});
router.get("/productDetail", (req, res)=>{
    res.status(200).render("productDetail");
});
router.get("/shoppingCart", (req, res)=>{
    res.status(200).render("shoppingCart");
});

module.exports = router;
