var assert = require('chai').assert
var FlexEvent = require('../models/flex_event.js');
var moment = require('moment');

var fEvent1 = new FlexEvent("TITLE_1", "DESCRIPTION_1", "LOCATION_1", "LENGTH_1", 0, "COMPLETE_1");
assert.equal(fEvent1.title, "TITLE_1");
assert.equal(fEvent1.type, "FLEX_EVENT");
assert.equal(fEvent1.description, "DESCRIPTION_1");
assert.equal(fEvent1.location, "LOCATION_1");
assert.equal(fEvent1.length, "LENGTH_1");
assert.equal(fEvent1.eventConstraints, 0);
assert.equal(fEvent1.completeBy, "COMPLETE_1");
assert.equal(fEvent1.toString(), 'Title: TITLE_1\nType: FLEX_EVENT\nDescription: DESCRIPTION_1\nLocation: LOCATION_1\nEvent Length (Hr): LENGTH_1\nEventConstraints: Event time preference: No preference\nComplete by: COMPLETE_1');

var date1 = moment().add(1, "d");
var date2 = moment().add(1, "h")
var fEvent2 = new FlexEvent("TITLE_2", "DESCRIPTION_2", "LOCATION_2", 0.5, 1, date1);
var fEvent3 = new FlexEvent("TITLE_3", "DESCRIPTION_3", "LOCATION_3", 0.5, 2, date2);
var fEvent4 = new FlexEvent("TITLE_4", "DESCRIPTION_4", "LOCATION_4", 1, 3, date2);
var fEvent5 = new FlexEvent("TITLE_5", "DESCRIPTION_5", "LOCATION_5", "LENGTH_5", 4, "COMPLETE_5");
var fEvent6 = new FlexEvent("TITLE_6", "DESCRIPTION_6", "LOCATION_6", "LENGTH_6", 5, "COMPLETE_6");
var fEvent7 = new FlexEvent("TITLE_7", "DESCRIPTION_7", "LOCATION_7", "LENGTH_7", 6, "COMPLETE_7");
var fEvent8 = new FlexEvent("TITLE_8", "DESCRIPTION_8", "LOCATION_8", "LENGTH_8", 7, "COMPLETE_8");
assert.equal(fEvent2.eventConstraintsToString(), "Event time preference: morning", "check eventConstraintsToString function")
assert.equal(fEvent3.eventConstraintsToString(), "Event time preference: afternoon", "check eventConstraintsToString function")
assert.equal(fEvent4.eventConstraintsToString(), "Event time preference: night", "check eventConstraintsToString function")
assert.equal(fEvent5.eventConstraintsToString(), "Event time preference: morning or afternoon", "check eventConstraintsToString function")
assert.equal(fEvent6.eventConstraintsToString(), "Event time preference: afternoon or night", "check eventConstraintsToString function")
assert.equal(fEvent7.eventConstraintsToString(), "Event time preference: morning or night", "check eventConstraintsToString function")
assert.equal(fEvent8.eventConstraintsToString(), "Event time preference: morning, afternoon, or night", "check eventConstraintsToString function")

assert.isBelow(fEvent2.rank, fEvent3.rank, "Rank is first if complete date is before other");
assert.isBelow(fEvent3.rank, fEvent4.rank, "Rank is first if length is longer other");



console.log("All Tests for FlexEvent passed");
