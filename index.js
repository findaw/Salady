const express = require("express");
const app = express();
const port =  process.env.PORT || 4000;
const router = require("./router/router.js");
const path = require("path");
const fs = require("fs");
const confStr = fs.readFileSync("./config.json");
const conf = JSON.parse(confStr);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client/views"));
require("./router/controller/setDefaultOption.js").setDefaultOption(app, {name:"", type:-1});

app.set("projectDir", "D:/ll/project/Salady/");
app.set("secretKey", conf.secretKey);

app.use("/", router);

app.listen(port, ()=>{
    console.log("Listening on " + port + " port");
});
