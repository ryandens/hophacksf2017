var BaseEvent = require("./base_event.js")
var moment = require('moment');

class HardEvent extends BaseEvent {
    constructor(title, description, location, startTime, endTime) {
        super(title, "HARD_EVENT", description, location);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    toString() {
        var result = super.toString();
        result += "\nStart Time: " + this.startTime + "\nEnd Time: " + this.endTime;
        return result;
    }

    getFunction(start, end) {
      const BUFFER = 15 * 60 * 1000;
      var rectangle = getRectangleArea(start, end);
      var triangleOne = getTriangleArea(start, end, this.startTime - BUFFER, this.startTime);
      var triangleTwo = getTriangleArea(start, end, this.endTime, this.endTime + BUFFER);
      return rectangle + triangleOne + triangleTwo;
    }

    getRectangleArea(start, end) {
        const CONST = 1;
        if (end < this.startTime || start > this.endTime) {
          return 0;
        }
        if (start < this.startTime) {
          start = this.startTime;
        }
        if (end > this.endTime) {
          end = this.endTime;
        }
        return (end - start) * CONST
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

module.exports = HardEvent;
