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
    area under curve for one triangle
  */
  getFunction(start, end) {
      var midPoint = (this.endTime - this.startTime) / 2;
      var areaOne = getTriangleArea(start, end, midPoint, this.endTime);
      var areaTwo = getTriangleArea(start, end, this.startTime, midPoint);
      return areaOne + areaTwo;
  }

  getTriangleArea(startFlex, endFlex, startHard, endHard) {
      const CONST = 1;
      if (endFlex < startHard || startFlex > endHard) {
        return 0;
      }
      if (startFlex < startHard) {
        startFlex = startHard;
      }
      if (endFlex > endHard) {
        endFlex = endHard;
      }
      var height = CONST * (endFlex - startFlex) / (endHard - startHard);
      return (endFlex - startFlex) * height / 2;
  }
}

module.exports = Constraint
