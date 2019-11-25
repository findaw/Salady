const express = require("express");
const router = express.Router();

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