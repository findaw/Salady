const express = require("express");
const app = express();
const port =  process.env.PORT || 4000;
const router = require("./router/router.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const confStr = fs.readFileSync("./config.json");
const conf = JSON.parse(confStr);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client/views"));

app.set("projectDir", "D:/ll/project/Salady/");
app.set("jwtSecret", conf.jwtSecret);
app.set("cookieSecret", conf.cookieSecret)
app.set("userToken", null);

app.use(cookieParser(app.get("cookieSecret")));
app.use(express.static("client/public"));

app.use("/", router);

app.listen(port, ()=>{
    console.log("Listening on " + port + " port");
});
