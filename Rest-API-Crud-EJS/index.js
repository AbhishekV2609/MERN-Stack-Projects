    const express = require("express");
    const app = express();
    const path = require("path");
    const PORT = 8080;
    const { v4: uuidv4 } = require("uuid");
    const methodOverride = require("method-override");

    app.use(methodOverride("_method"));
    app.use(express.urlencoded({ extended: true }));

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));

    app.use(express.static(path.join(__dirname, "public")));

    let posts = [
        {
            id: uuidv4(),
            username: "john_doe",
            content: "Hello, this is my first post!",
        },
        {
            id: uuidv4(),
            username: "jane_smith",
            content: "Excited to join this platform!",
        },
        {
            id: uuidv4(),
            username: "alice_wonder",
            content: "Just had a great day at the park!",
        }
    ];
    app.get("/posts", (req, res) => {
        res.render("index.ejs", { posts });
    });

    app.get("/posts/new", (req, res) => {
        res.render("new.ejs"); 
    });

    app.post("/posts", (req, res) => {
        let { username, content } = req.body;
        let id = uuidv4();
        posts.push({id, username, content });
        // res.send("post request working");
        res.redirect("/posts");
    });

    app.get("/posts/:id", (req, res) => {
        let { id } = req.params;
        console.log(id);
        let post = posts.find((p) => p.id == id);
        // console.log(post);
        // res.send("post id request working");
        res.render("show.ejs", { post });
    });

    app.patch("/posts/:id", (req, res) => {
        let { id } = req.params;
        let newContent = req.body.content;
        let post = posts.find((p) => p.id == id);
        post.content = newContent;
        console.log(post);
        res.redirect("/posts");
    });    

    app.get("/posts/:id/edit", (req, res) => {
        let { id } = req.params;
        let post = posts.find((p) => p.id == id);
        res.render("edit.ejs", { post });
    });

    app.delete("/posts/:id", (req, res) => {
        let { id } = req.params;
        posts = posts.filter((p) => p.id !== id);
        res.redirect("/posts");
    });

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });