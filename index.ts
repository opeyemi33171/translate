const express = require("express");

let app = express();

app.get("/", (req: any, res : any) => {
    res.send("<h1>Welcome to Translate</h1>");
});


app.listen(process.env.PORT, ()=>{
    console.log(`listening at port: ${process.env.PORT}`);
}); 