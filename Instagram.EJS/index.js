const express = require('express');
const app = express();
const path = require('path');

const port = 3026;

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/css")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

/* app.get("/ig/:username", (req, res) => {
    const followers = ["adam", "bob", "steve", "abc"];
    let { username } = req.params;
    res.render("instagram.ejs", { username, followers });
}); */

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    console.log(data);
    if(data) {
       res.render("instagram.ejs", { data }); 
    }
    else {
        res.render("error.ejs");
    }
    // res.render("instagram.ejs", { data: instaData[username] });
});

app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get("/hello", (req, res) => {
    res.send("hello world");
});

/* app.get("/rolldice", (req, res) => {
    res.render("rolldice.ejs");
}); */

app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1; 
    res.render("rolldice.ejs", { diceVal });
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});