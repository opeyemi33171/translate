import express from "express";
import path from "path";
import { Word } from './word';
import {Client} from "pg";

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

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
    client.connect((err: Error) =>{
        console.log("CONNECTION_ERROR");
        console.log(err);
    });
    client.query(`CREATE TABLE Word(id INT NOT NULL AUTO_INCREMENT, english VARCHAR(255), french VARCHAR(255), PRIMARY KEY(id))`, (err, res)=>{
        if(err)throw err;
        console.log(res);
    });
    client.end();
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
