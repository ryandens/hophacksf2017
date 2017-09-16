var express = require('express');
var bodyParser = require('body-parser');
var firebase = require("firebase");
var local_variables = require("./local_variables.js");
var HardEvent = require("./models/hard_event.js");
var Constraint = require("./models/constraint.js");
var FlexEvent = require("./models/flex_event.js")
var Schedule = require("./models/schedule.js")

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

var a = new HardEvent("1", "description1", "location", new Date(2013, 2, 1, 1, 10), new Date(2013, 2, 1, 5, 10));
var b = new HardEvent("2", "description2", "location", new Date(2014, 2, 1, 1, 10), new Date(2014, 2, 1, 5, 10));
var c = new HardEvent("3", "description3", "location", new Date(2015, 2, 1, 1, 10), new Date(2015, 2, 1, 5, 10));
var d = new HardEvent("4", "description4", "location", new Date(2016, 2, 1, 1, 10), new Date(2016, 2, 1, 5, 10));
var e = new HardEvent("5", "description5", "location", new Date(2017, 2, 1, 1, 10), new Date(2017, 2, 1, 5, 10));

var arr = [a, b, c, d, e]
console.log((new Schedule("schedule title", 1, arr)).toString());

var alpha = new HardEvent("title", "description", "location", new Date(2013, 2, 1, 1, 10), new Date(2013, 2, 1, 5, 10));
console.log("spot on: " + alpha.getFunction(new Date(2013, 2, 1, 5, 10)));
console.log("too late: " + alpha.getFunction(new Date(2013, 2, 1, 6, 10)));
console.log("too early: " + alpha.getFunction(new Date(2013, 2, 1, 0, 10)));
console.log("early buffer: " + alpha.getFunction(new Date(2013, 2, 1, 1, 6)));
console.log("late buffer: " + alpha.getFunction(new Date(2013, 2, 1, 5, 24)));
