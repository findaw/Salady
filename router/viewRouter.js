const express = require("express");
const router = express.Router();
const path = require("path");

/*
    /view/
*/


router.use("/manage", require("./view/manageRouter.js"));
router.use("/join", require("./view/joinRouter.js"));

router.get("/login", (req, res)=>{
    res.status(200).render("login");
});

router.get("/welcome", (req, res)=>{
    res.status(200).render("welcome",{});
});
router.get("/product", (req, res)=>{
    res.status(200).render("product",{});
});

router.get("/productDetail", (req, res)=>{
    res.status(200).render("productDetail",{});
});
router.get("/shoppingCart", (req, res)=>{
    res.status(200).render("shoppingCart",{});
});
router.get("/member", (req, res)=>{
    res.status(200).render("member",{});
});

module.exports = router;
