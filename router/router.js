const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static("client/public"));
router.get("/", (req, res)=>{
    let name = req.app.get("userName");
    res.status(200).render("home",{"type":req.app.get("userType"), "name":name});
});

router.use("/view", require("./viewRouter.js"));
router.use("/api", require("./apiRouter.js"));




router.use((req, res, next)=>{
    throw new Error(req.url + " URL not found!");
})
router.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).render("error",{"type":"member"});
    
});

module.exports = router;
