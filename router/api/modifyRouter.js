const express = require("express");
const router = express.Router();

/*
    /api/modify/
*/


//router.post("/product", require("../controller/modifyProduct.js"));
router.post("/ingredient", require("../controller/modifyIngre.js"));

module.exports = router;