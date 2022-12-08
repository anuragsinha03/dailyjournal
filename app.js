
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is your daily journal tracker, here you put your thoughts, todos, blogs. Basically anything you want to keep! I will maintain your secrecy and will not read, share or upload your private conversations with you journal. KEEP SHARING!! ♥";
const aboutContent = "This is your daily journal tracker, here you put your thoughts, todos, blogs. Basically anything you want to keep! I will maintain your secrecy and will not read, share or upload your private conversations with you journal. KEEP SHARING!! ♥.";
const contactContent = "Amigos! This is Anurag Sinha, a webdeveloper in the making. I'm learning backend development with NODE, I do frontends, cloud. Open to collab on public projects";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    textContent: homeStartingContent,
    posts: posts
  });
});

app.get("/posts/:topic", function(req, res){
  let requestedTitle = _.lowerCase(req.params.topic);
  posts.forEach(function(post){
    let storedTitle = _.lowerCase(post.title)
    if (requestedTitle === storedTitle) {
      res.render("post", {
        title: post.title, 
        content: post.content});
    }
  });
});

app.get("/about", function(req, res){
  res.render("about", {textContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {textContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
