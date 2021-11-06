import express from "express";
import path from "path";
import { Word } from './word';
import  bodyParser from 'body-parser';

let app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

let wordMap : Word[] = [];

app.get("/", (req: any, res: any) => {
    res.render("index", {
        message: "Welcome To Translate"
    });
});

app.post('/new-word', (req: any, res: any) =>{
    wordMap.push(req.body);
    res.send("New word added");
});

app.listen(process.env.PORT || 2000, () => {
    console.log(`listening at port: 2000`);
});

app.get('/words', (req, res) => {
    console.log(wordMap);
    
    res.render("list", {
        message:"List Of Words",
        wordObject: wordMap
    });
});
