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

function buildWordInserQuery(engWord: string, frenWord: string) {
    return `INSERT INTO word (english, french) VALUES ('${engWord}', '${frenWord}');`;
}

let app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

let wordMap : Word[] = [];

client.connect((err: Error) => {
    if(err){
        throw new Error(`error connecting to database: ${err}`);
    }
});


app.get("/", (req: any, res: any) => {
    res.render("index", {
        message: "Welcome To Translate"
    });
});

app.post('/new-word', (req: any, res: any) =>{
    const wordItem = req.body;

    const wordInsertQuery = buildWordInserQuery(wordItem.english, wordItem.french);

    client.query(wordInsertQuery, (err, res) => {
        if(err){
            throw new Error(`error querying database: ${err}`);
        } 
    });

    res.send("New word added");
});

app.get('/close', (req, res) => {
    client.end();
    res.send("db closed");
})

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
