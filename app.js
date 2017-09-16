var express = require('express');
var bodyParser = require('body-parser');
var firebase = require("firebase");
var local_variables = require("./local_variables.js");
var HardEvent = require("./models/hard_event.js");
var Constraint = require("./models/constraint.js");

var app = express();

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: local_variables.apiKey,
  authDomain: local_variables.authDomain,
  databaseURL: local_variables.databaseURL,
  storageBucket: local_variables.storageBucket,
};
firebase.initializeApp(config);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

app.listen("8080", console.log("Server has started on port 8080"));
console.log((new HardEvent("title", "description", "location", "startTime", "endTime")).toString())
console.log((new Constraint("title", "description", "location", "startTime", "endTime", "priority")).toString())
