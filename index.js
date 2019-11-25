const express = require("express");
const app = express();
const port =  process.env.PORT || 4000;
const router = require("./router/router.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
let conf = null;
const isExists = fs.existsSync('./config.json');
if(isExists){
    let confStr = fs.readFileSync("./config.json");
    conf = JSON.parse(confStr);
}     
app.set("jwtSecret", process.env.jwtSecret || conf.jwtSecret);
app.set("cookieSecret", process.env.cookieSecret || conf.cookieSecret);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client/views"));

app.set("projectDir", "D:/ll/project/Salady/");
app.set("imgNameLength", 60);

app.use(cookieParser(app.get("cookieSecret")));
app.use(express.static("client/public"));

app.use("/", router);

app.listen(port, ()=>{
    console.log("Listening on " + port + " port");
});
