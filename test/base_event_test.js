var assert = require('chai').assert
var BaseEvent = require('../models/base_event.js');

var bEvent1 = new BaseEvent("TITLE_1", "TYPE_1", "DESCRIPTION_1", "LOCATION_1");
assert.equal(bEvent1.title, "TITLE_1");
assert.equal(bEvent1.type, "TYPE_1");
assert.equal(bEvent1.description, "DESCRIPTION_1");
assert.equal(bEvent1.location, "LOCATION_1");
assert.equal(bEvent1.toString(), "Title: TITLE_1\nType: TYPE_1\nDescription: DESCRIPTION_1\nLocation: LOCATION_1", "BaseEvent does not handle toString");

console.log("All Tests for BaseEvent passed");
