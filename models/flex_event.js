var BaseEvent = require("./base_event.js")
var moment = require('moment');

class FlexEvent extends BaseEvent {

    /**
     * Makes a FlexEvent, which is an event that needs to be scheduled but can be done at any time.
     * @param title, @param description, @param location as described in super constructor
     * @param length double is the length of the event in hours
     * @param eventConstraints int representing the preference for morning/afternoon/night
     * @param completeBy datatime of when the tevent has to be completed by
     */
    constructor(title, description, location, length, eventConstraints, completeBy) {
        super(title, "FLEX_EVENT", description, location);
        this.length = length;
        this.eventConstraints = eventConstraints;
        this.completeBy = completeBy;
        this.rank = ((this.length - ((this.completeBy - moment().toDate()) / (60*60*1000) / 24)) * (Math.ceil(this.eventConstraints / 3) + 1));
    }

    toString() {
        var result = super.toString();
        result += "\nEvent Length (Hr): " + this.length + "\nEventConstraints: " + this.eventConstraintsToString();
        result += "\nComplete by: " + this.completeBy.toString();
        return result;
    }

    static fromJSON(json_array) {
        var result = [];

        for (var i = 0; i < json_array.length; i++) {
            var curr_json = json_array[i];
            result.push(new FlexEvent(curr_json.title, curr_json.description, curr_json.location, curr_json.length, curr_json.eventConstraints, new Date(curr_json.completeBy)));
        }

        return result;
    }

    /**
     * Translates the integer eventConstraints into a stirng that represents the Event's preferences
     */
    eventConstraintsToString() {
        var result = "Event time preference: ";
        switch(this.eventConstraints) {
            case 0:
                return result += "No preference"
                break;
            case 1:
                return result += "morning"
                break;

            case 2:
                return result += "afternoon"
                break;

            case 3:
                return result += "night"
                break;
            case 4:
                return result += "morning or afternoon"
                break;
            case 5:
                return result += "afternoon or night"
                break;

            case 6:
                return result += "morning or night"
                break;

            case 7:
                return result += "morning, afternoon, or night"
                break;
        }
    }
}

module.exports = FlexEvent;
