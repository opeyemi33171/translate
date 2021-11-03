"use strict";
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("<h1>Welcome to Translate</h1>");
});
app.listen(2000, function () {
    console.log("listening at port: 2000");
});
