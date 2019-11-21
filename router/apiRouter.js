const express = require("express");
const router = express.Router();
const formidable  = require("formidable");
const mysql = require("mysql2/promise");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const dbConfStr = fs.readFileSync("./database.json");
const dbConf = JSON.parse(dbConfStr);
const pool = mysql.createPool({
    host : dbConf.host,
    user : dbConf.user,
    password : dbConf.password,
    database : dbConf.database,
    connectionLimit:20,
    waitForConnections:false,
});

const controller = require("./controller/controller.js");

router.use(express.json());
router.use((req,res,next)=>{
    next();
});

/*
    /api/
*/

router.use("/add", require("./api/addRouter.js"));
router.use("/modify", require("./api/modifyRouter.js"));

router.post("/check/join/:id", controller.checkJoin);

router.post("/login/account", controller.loginAccount);
router.post("/logout/account", controller.logoutAccount);

router.post("/join/member", controller.joinMember);
router.post("/join/seller", controller.joinSeller);


module.exports = router;