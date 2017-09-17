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
      var rectangle = this.getRectangleArea(start, end);
      var triangleOne = this.getTriangleArea(start, end, this.startTime - BUFFER, this.startTime);
      var triangleTwo = this.getTriangleArea(start, end, this.endTime, this.endTime + BUFFER);
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


    static fromJSON(json_array) {
        var result = [];

        for (var i = 0; i < json_array.length; i++) {
            var curr_json = json_array[i];
            result.push(new HardEvent(curr_json.title, curr_json.description, curr_json.location, new Date(curr_json.startTime), new Date(curr_json.endTime)));
        }

        return result;
    }

    toJSON() {
        return { start: this.startTime, end: this.endTime, title: this.title, type: this.type, description: this.description, location: this.location }
    }
}

module.exports = HardEvent;
