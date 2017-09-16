var express = require('express');
var bodyParser = require('body-parser');
var firebase = require("firebase");
var local_variables = require("./local_variables.js");
var HardEvent = require("./models/hard_event.js");
var Constraint = require("./models/constraint.js");
var FlexEvent = require("./models/flex_event.js")

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

app.listen("8080", console.log("Server has started on port 8080\n"));
console.log("\nHard Event");
console.log((new HardEvent("title", "description", "location", new Date(2013, 2, 1, 1, 10), new Date(2013, 2, 1, 5, 10))).toString());
console.log("\nConstraint");
console.log((new Constraint("title", "description", "location", new Date(2013, 2, 1, 1, 10), new Date(2013, 2, 1, 5, 10), "priority")).toString());
console.log("\nFlex Event");
console.log((new FlexEvent("title", "description", "location", 4, 2, new Date(2013, 2, 1, 1, 10))).toString());
