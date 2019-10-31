const express = require("express");
const router = express.Router();
const formidable  = require("formidable");

router.use(express.json());
router.use((req,res,next)=>{
    console.log(req);
    next();
})
router.post("/join/account", (req ,res)=>{
    let form = formidable.IncomingForm();
    form.parse(req, (err, fields)=>{
        console.log(fields);
    });


    
    res.status(200).send("Success...<script type='text/javascript'>location.href='/view/welcome';</script>");
});
router.post("/login/account", (req ,res)=>{
    let form = formidable.IncomingForm();
    form.parse(req, (err, fields)=>{
        console.log(fields);
    });


    res.status(200).send("Success...<script type='text/javascript'>alert('완료되었습니다.');location.href='/';</script>");
});

module.exports = router;