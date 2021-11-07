"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var pg_1 = require("pg");
var client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
var app = (0, express_1.default)();
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.urlencoded({ extended: true }));
var wordMap = [];
app.get("/", function (req, res) {
    res.render("index", {
        message: "Welcome To Translate"
    });
});
app.post('/new-word', function (req, res) {
    wordMap.push(req.body);
    res.send("New word added");
});
app.listen(process.env.PORT || 2000, function () {
    console.log("listening at port: 2000");
});
app.get('/words', function (req, res) {
    console.log(wordMap);
    res.render("list", {
        message: "List Of Words",
        wordObject: wordMap
    });
});
