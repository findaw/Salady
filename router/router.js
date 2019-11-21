const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static("client/public"));

router.use((req,res,next)=>{
    console.log("router.js 1");
    console.log(req.headers["x-access-token"]);





    next();
});

router.get("/", (req, res)=>{
    console.log({
        ...req.app.get("defaultOption"),
    });
    res.status(200).render("home",{
        ...req.app.get("defaultOption"),
    });
});


router.use("/view", require("./viewRouter.js"));
router.use("/api", require("./apiRouter.js"));
router.use("/admin", require("./adminRouter.js"));


router.use((req, res, next)=>{
    throw new Error(req.url + " URL not found!");
})
router.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).render("error",{...req.app.get("defaultOption")});
    
});




module.exports = router;
