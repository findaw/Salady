const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");

//토큰 검증
router.use(require("./controller/checkToken.js"));

router.get("/", (req, res)=>{
    res.status(200).render("home",{});
});


router.use("/view", require("./viewRouter.js"));
router.use("/api", require("./apiRouter.js"));
router.use("/admin", require("./adminRouter.js"));


router.use((req, res, next)=>{
    throw new Error(req.url + " URL not found!");
})
router.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).render("error",{});
    
});




module.exports = router;
