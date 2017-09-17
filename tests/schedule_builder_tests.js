var ScheduleBuilderController = require('../controllers/schedule_builder_controller.js');
var data = require('../data/data.json');

var HardEvent = require('../models/hard_event.js');
var FlexEvent = require('../models/flex_event.js');
var Constraint = require('../models/constraint.js');

var hardEvents = HardEvent.fromJSON(data.hard);
var constraints = Constraint.fromJSON(data.constraint);
var flex = FlexEvent.fromJSON(data.flex);

console.log(hardEvents.length);
console.log(constraints);
console.log(flex);
