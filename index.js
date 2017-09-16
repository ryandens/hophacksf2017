var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  //res.send("<h1>you are at the home page bruh<h1>");
  res.sendFile('index.html');
});

app.listen("8080", console.log("Server has started"));
