var HardEvent = require("./models/hard_event.js");
var Constraint = require("./models/constraint.js");
var FlexEvent = require("./models/flex_event.js");
var Schedule = require("./models/schedule.js");
var moment = require('moment');


/**
 * build best schedules given hard, flex and constraint events.
 * @param hardEvents, @param flexEvents, @param constraints arrays of each type of event;
 */
function buildSchedules(hardEvents, flexEvents, constraints) {
  var SheduledEvents = hardEvents.slice(0);
  constraints.forEach(function(constraint) {
    SheduledEvents.push(constraint);
  })

  var rankedFlexEvents = rank(flexEvents);
}

function rank(flexEvents) {
  var rankedEvents = [];
  flexEvents.forEach(function(event) {
    rank = event.length - (Date.getHours(moment().toDate() - event.completeBy)) / 24 * (Math.ceil(event.constraint / 3) + 1)
    rankedEvents.push({
      "event": event;
      "rank": rank;
    })
  })

  rankedEvents.sort(function(a,b) {
    return a.rank - b.rank;
  });
}
