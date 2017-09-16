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
      const CONST = 1;
      if (end < this.startTime || start > (this.endTime)) {
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
}

module.exports = HardEvent;
