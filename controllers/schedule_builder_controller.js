var TreeAndNode = require("../models/tree.js")
var Tree = TreeAndNode.Tree;
var Node = TreeAndNode.Node;
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
      for(var i = 0; i < this.constraints.length; i++) {
        this.scheduledEvents.push(this.constraints[i]);
      }

      var rankedFlexEvents = this.flexEvents.sort(function(a, b) {
        return a.rank - b.rank;
      });

      var rootNode = new Node();
      rootNode = rootNode.construcWithArray(this.scheduledEvents)
      var tree = new Tree(rootNode);
      var lastLevelNodes = [rootNode];
      rankedFlexEvents.forEach(function(event) {
        lastLevelNodes = ScheduleBuilderController.fitFlexedEvents(lastLevelNodes, tree, event);
      })
    }

    /**
     * Fits one ranked event into a slot
     * @param scheduledEvents @param flexEvent
     * @return one hard event (a fit flex event)
     */
    static fitFlexedEvents(lastLevelNodes, tree, flexEvent) {
      var newLastNodes = [];
      lastLevelNodes.forEach(function(node) {
        var myMap = new Map();
          for (var i = moment(); i.toDate() < flexEvent.completeBy; i.add(5,"m")) {
            var sumCosts = 0;
            for (var j = 0; j < node.schedule.length; j++) {
              sumCosts += node.schedule[j].getFunction(i.toDate(), i.add(flexEvent.length, "h").toDate());
            }
            myMap.set(sumCosts, i.toDate());
          }
        var myMap = new Map([...myMap.entries()].sort(function(a,b) {
          return a - b;
        }));
        let keys = Array.from( myMap.keys() )
        var minCost1 = keys[0];
        var minCost2 = keys[1];
        var minTime1 = myMap.get(keys[0]);
        var minTime2 = myMap.get(keys[1]);
        var event1 = new HardEvent(flexEvent.title, flexEvent.description, flexEvent.location, minTime1, minTime1 + flexEvent.length);
        var event2 = new HardEvent(flexEvent.title, flexEvent.description, flexEvent.location, minTime2, minTime2 + flexEvent.length);
        var node1 = new Node();
        node1 = node1.constructWithParent(event1, minCost1, node)
        var node2 = new Node();
        node2 = node2.constructWithParent(event2, minCost2, node)
        tree.insertNode(node1, node);
        tree.insertNode(node2, node);
        newLastNodes.push(node1);
        newLastNodes.push(node2);
      });
      lastLevelNodes = newLastNodes.slice(0);
      return lastLevelNodes
    }
}

module.exports = ScheduleBuilderController;
