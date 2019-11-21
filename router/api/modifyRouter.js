const express = require("express");
const router = express.Router();

/*
    /api/modify/
*/


const controller = require("../controller/controller.js");
//router.post("/product", controller.modifyProduct);
router.post("/ingredient", controller.modifyIngre);

module.exports = router;