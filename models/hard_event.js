var BaseEvent = require("./base_event.js")

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
}

module.exports = HardEvent;
