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

client.connect((err: Error) => {
    if(err){
        throw new Error(`error connecting to database: ${err}`);
    }
});

function buildWordInserQuery(id: number, engWord: string, frenWord: string) {
    return `INSERT INTO word (id, english, french) VALUES (${id}, '${engWord}', '${frenWord}');`;
}

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
    const wordItem = req.body;

    const wordInsertQuery = buildWordInserQuery(2, wordItem.english, wordItem.french);

    client.query(wordInsertQuery, (err, res) => {
        if(err){
            throw new Error(`error querying database: ${err}`);
        } 
        client.end();
    });

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
