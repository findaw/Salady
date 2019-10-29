const express = require("express");
const app = express();
const port =  process.env.PORT || 4000;
const router = require("./router/router.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client/views"));
app.use("/", router);

app.listen(port, ()=>{
    console.log("Listening on 4000 port");
});
