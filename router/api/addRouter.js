const express = require("express");
const router = express.Router();

/*
    /api/add/
*/


router.post("/product", require("../controller/addProduct.js"));
router.post("/ingredient", require("../controller/addIngre.js"));

module.exports = router;