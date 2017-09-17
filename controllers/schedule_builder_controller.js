var HardEvent = require("../models/hard_event.js");
var Constraint = require("../models/constraint.js");
var FlexEvent = require("../models/flex_event.js");
var Schedule = require("../models/schedule.js");
var moment = require('moment');

class ScheduleBuilderController {
    constructor(hardEvents, flexEvents, constraints) {
        this.hardEvents = hardEvents;
        this.flexEvents = flexEvents;
        this.constraints = constraints;
    }
    /**
     * build best schedules given hard, flex and constraint events.
     * @param hardEvents, @param flexEvents, @param constraints arrays of each type of event;
     */
    buildSchedules() {
      var scheduledEvents = this.hardEvents.slice(0); //gets all hardEvents
      this.constraints.forEach(function(constraint) {
        scheduledEvents.push(constraint);
      })

      var rankedFlexEvents = this.rank(this.flexEvents);
    }

    /**
     * Fits one ranked event into a slot
     * @param scheduledEvents @param flexEvent
     * @return one hard event (a fit flex event)
     */
    fitFlexedEvents(scheduledEvents, flexEvent) {
        var min = -1;
        for (var j = 0; j < scheduledEvents.length; j++) {
            var temp = 0;
            temp += scheduledEvents[j].getFunction();
        }
    }

    rank(flexEvents) {
      var rankedEvents = [];
      flexEvents.forEach(function(event) {
        var date = new Date(moment().toDate() - event.completeBy);
        var rank = (event.length - (date.getHours()) / 24) * (Math.ceil(event.constraint / 3) + 1)));
        rankedEvents.push({
          "event": event,
          "rank": rank
        })
      })
      rankedEvents.sort(function())

    }
}



module.exports = ScheduleBuilderController;
