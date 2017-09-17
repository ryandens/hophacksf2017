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

      var rootNode = new node(this.scheduledEvents);
      var tree = new Tree(rootNode);
      var lastLevelNodes = rootNode;
      rankedFlexEvents.forEach(function(event) {
        fitFlexedEvents(lastLevelNodes, tree, event);
      })
    }

    /**
     * Fits one ranked event into a slot
     * @param scheduledEvents @param flexEvent
     * @return one hard event (a fit flex event)
     */
    fitFlexedEvents(lastLevelNodes, tree, flexEvent) {
      var newLastNodes = [];
      lastLevelNodes.forEach(function(node) {
        var arrayOfSum;
          for (var i = moment(); i.toData() < flexEvent.completeBy; i.add(5,"m")) {
            var sumCosts = 0;
            for (var j = 0; j < node.scheduledEvents.length; j++) {
              sumCosts += node.scheduledEvents[j].getFunction(i.toDate(), i.add(flexEvent.length, "h").toDate());
            }
            arrayOfSum.push(sumCosts);
          }
        var min1 = getMin1(arrayOfSum);
        var min2 = getMin2(arrayOfSum);
        var event1 = new HardEvent(flexEvent.title, flexEvent.description, flexEvent.location, min1, min1 + flexEvent.length);
        var event2 = new HardEvent(flexEvent.title, flexEvent.description, flexEvent.location, min2, min2 + flexEvent.length);
        var node1 = new node(event1, node, min2);
        var node2 = new node(event2, node, min2);
        tree.insert(node1, node);
        tree.insert(node2, node);
        newLastNodes.push(node1);
        newLastNodes.push(node2);
      });
    lastLevelNodes = newLastNodes.slice(0);
    }
}

module.exports = ScheduleBuilderController;
