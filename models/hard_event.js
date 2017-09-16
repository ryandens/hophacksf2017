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

    getFunction(x) {
      const BUFFER_TIME = 15; //mins
      const MILLISECOND = 60 * 1000;
      if (x < moment(this.startTime).subtract(BUFFER_TIME, "m").toDate() || x > moment(this.endTime).add(BUFFER_TIME, "m").toDate()) {
        return 0;
      } else if (x >= moment(this.startTime).subtract(BUFFER_TIME, "m").toDate() && x < this.startTime) {
        return BUFFER_TIME * MILLISECOND - (this.startTime - x);
      } else if (x <= moment(this.endTime).add(BUFFER_TIME, "m").toDate() && x > this.endTime) {
        return BUFFER_TIME * MILLISECOND - (x - this.endTime);
      } else {
        return BUFFER_TIME * MILLISECOND;
      }
    }
}

module.exports = HardEvent;
