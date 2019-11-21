const express = require("express");
const router = express.Router();

/*
    /api/add/
*/


const controller = require("../controller/controller.js");

router.post("/product", controller.addProduct);
router.post("/ingredient", controller.addIngre);

module.exports = router;