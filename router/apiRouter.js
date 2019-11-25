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

router.use(express.json());
router.use((req,res,next)=>{
    next();
});

/*
    /api/
*/

router.use("/add", require("./api/addRouter.js"));
router.use("/modify", require("./api/modifyRouter.js"));

router.post("/check/join/:id", require("./controller/checkJoin.js"));

router.post("/login/account", require("./controller/loginAccount.js"));
router.get("/logout/account", require("./controller/logoutAccount.js"));

router.post("/join/member", require("./controller/joinMember.js"));
router.post("/join/seller", require("./controller/joinSeller.js"));


module.exports = router;