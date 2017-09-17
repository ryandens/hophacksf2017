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
        this.scheduledEvents = [];
    }
    /**
     * build best schedules given hard, flex and constraint events.
     * @param hardEvents, @param flexEvents, @param constraints arrays of each type of event;
     */
    buildSchedules() {
      this.scheduledEvents = this.hardEvents.slice(0); //gets all hardEvents
      this.constraints.forEach(function(constraint) {
        scheduledEvents.push(constraint);
      })


      var rankedFlexEvents = this.flexEvents.sort(function(a, b) {
        return a.rank - b.rank;
      });

      rankedFlexEvents.forEach(function(event) {
        fitFlexedEvents(event);
      })
    }

    /**
     * Fits one ranked event into a slot
     * @param scheduledEvents @param flexEvent
     * @return one hard event (a fit flex event)
     */
    fitFlexedEvents(flexEvent) {

    }
}



module.exports = ScheduleBuilderController;
