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
        this.tree = null;
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
        return b.rank - a.rank;
      });

    //   rankedFlexEvents.forEach(function(event) {
    //       console.log(event);
    //       console.log(event.rank);
    //   });

      var rootNode = new Node();
      rootNode = rootNode.construcWithArray(this.scheduledEvents)
      this.tree = new Tree(rootNode);
      var lastLevelNodes = [rootNode];
      rankedFlexEvents.forEach(function(event) {
        lastLevelNodes = ScheduleBuilderController.fitFlexedEvents(lastLevelNodes, event);
      })
    }

    /**
     * Fits one ranked event into a slot
     * @param scheduledEvents @param flexEvent
     * @return one hard event (a fit flex event)
     */
    static fitFlexedEvents(lastLevelNodes, flexEvent) {
        var newLastNodes = [];
        var count = 0;
        lastLevelNodes.forEach(function(node) {
            var myMap = new Map();
            for (var i = moment("09/17/2017", "MM-DD-YYYY"); i.toDate() < flexEvent.completeBy; i.add(5,"m")) {
                var sumCosts = 0;
                for (var j = 0; j < node.schedule.length; j++) {
                  var newCost = node.schedule[j].getFunction(i.toDate(), moment(i).add(flexEvent.length, "h").toDate());
                  sumCosts += newCost;
                }
                myMap.set(sumCosts, i);
                count++;
            }
            var myMap = new Map([...myMap.entries()].sort(function(a,b) {
              return a - b;
            }
        ));
        let keys = Array.from( myMap.keys() )
        
        var minCost1 = keys[0];
        var minCost2 = keys[1];
        var minTime1 = myMap.get(minCost1);
        var minTime2 = myMap.get(minCost2);
        var event1 = new HardEvent(flexEvent.title, flexEvent.description, flexEvent.location, minTime1.toDate(), minTime1.add(flexEvent.length, "h").toDate());
        var event2 = new HardEvent(flexEvent.title, flexEvent.description, flexEvent.location, minTime2.toDate(), minTime2.add(flexEvent.length, "h").toDate());
        var node1 = new Node();
        node1 = node1.constructWithParent(event1, minCost1, node)
        var node2 = new Node();
        node2 = node2.constructWithParent(event2, minCost2, node)
        node.leftChild = node1;
        node.rightChild = node2;
        newLastNodes.push(node1);
        newLastNodes.push(node2);
      });
      lastLevelNodes = newLastNodes.slice(0);
      return lastLevelNodes
    }
}

module.exports = ScheduleBuilderController;
