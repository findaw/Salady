const express = require("express");
const router = express.Router();
const viewRouter = require("./viewRouter.js");
const path = require("path");

router.use(express.static("client/public"));
router.get("/", (req, res)=>{
    res.status(200).render("home");
});
router.use("/view", viewRouter);




router.use((req, res, next)=>{
    throw new Error(req.url + " URL not found!");
})
router.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).render("error");
    
});

module.exports = router;
