var BaseEvent = require("./base_event.js");

class Constraint extends BaseEvent {

  /**
    constructor for the Constraint event type.
    constraints are events that cacn be overriden.
    @param title, @param description, @param location as descibed in super class;
    @param startTime prefered start time of the constraint;
    @param endTime prefered end time of the constraint;
    @param priority priority of the constraint, int between 0 and 2;
  */
  constructor(title, description, location, startTime, endTime, priority) {
    super(title, "CONSTRAINT",description, location);
    this.startTime = startTime;
    this.endTime = endTime;
    this.priority = priority;
  }

  /**
    toString for internal testing;
  */
  toString() {
    var result = super.toString();
    result += "\nStart Time: " + this.startTime + "\nEnd Time: " + this.endTime;
    result += "\nPriority: " + this.priority;
    return result;
  }

  /**
    method that generates a function that models the availbality of time during
    constraint. Based on this.priority and this.startTime/endTime;
  */
  generateFunction() {
    return 2;
  }
}

module.exports = Constraint
