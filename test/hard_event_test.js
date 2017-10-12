var assert = require('chai').assert
var HardEvent = require('../models/hard_event.js');
var moment = require('moment');

var hEvent1 = new HardEvent("TITLE_1", "DESCRIPTION_1", "LOCATION_1", "START_TIME_1", "END_TIME_1");
assert.equal(hEvent1.title, "TITLE_1");
assert.equal(hEvent1.type, "HARD_EVENT");
assert.equal(hEvent1.description, "DESCRIPTION_1");
assert.equal(hEvent1.location, "LOCATION_1");
assert.equal(hEvent1.startTime, "START_TIME_1");
assert.equal(hEvent1.endTime, "END_TIME_1");
assert.equal(hEvent1.toString(), 'Title: TITLE_1\nType: HARD_EVENT\nDescription: DESCRIPTION_1\nLocation: LOCATION_1\nStart Time: START_TIME_1\nEnd Time: END_TIME_1');
assert.isObject(hEvent1.toJSON(), "toJSON does not output an object");
assert.equal(hEvent1.toJSON().start, hEvent1.startTime,"values not working for toJSON (in particular start)");


var date1 = moment();
var date2 = moment(date1).add(1, "h") //now + 60m
var date3 = moment(date1).add(30, "m"); //now + 30m
var date4 = moment(date1).add(15, "m"); //now + 15m
var date5 = moment(date1).add(2, "h"); //now + 120m
var date6 = moment(date1).subtract(1, "h") //now - 60m
var hEvent2 = new HardEvent("TITLE_2", "DESCRIPTION_2", "LOCATION_2", date1, date2);
//TODO Make tests for getFunction with Buffer. Right now only testing with rectangle.
assert.typeOf(hEvent2.getFunction(date1, date2), "number", "The getFunction does not return a number");
assert.equal(hEvent2.getFunction(date1, date2), 3600000, "superposition of start and end does not return the time difference")
assert.equal(hEvent2.getFunction(date3, date2), 1800000, "going from half the start time of the event to the end is not handled correctly")
assert.equal(hEvent2.getFunction(date1, date3), 1800000, "going from start time of the event to the half is not handled correctly")
assert.equal(hEvent2.getFunction(date4, date3), 900000, "15 in to 30 in returns incorectly")
assert.equal(hEvent2.getFunction(date3, date4), 0, "if start > end does not return 0");
assert.equal(hEvent2.getFunction(date1, date5), hEvent2.getFunction(date1, date2), "if end is out of bounds does not return the same as if it was equal to .endTime");
assert.equal(hEvent2.getFunction(date6, date2), hEvent2.getFunction(date1, date2), "if start is out of bounds does not return the same as if it was equal to .startTime")

console.log("All Tests for HardEvent passed");
