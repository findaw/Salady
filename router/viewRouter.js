const express = require("express");
const router = express.Router();
const path = require("path");


router.use(express.static("client/public"));

/*
    /view/
*/


router.use("/manage", require("./view/manageRouter.js"));
router.use("/join", require("./view/joinRouter.js"));

router.get("/login", (req, res)=>{
    res.status(200).render("login");
});

router.get("/welcome", (req, res)=>{
    res.status(200).render("welcome",{...req.app.get("defaultOption")});
});
router.get("/product", (req, res)=>{
    res.status(200).render("product",{...req.app.get("defaultOption")});
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
