var ScheduleBuilderController = require('../controllers/schedule_builder_controller.js');
var data = require('../data/data.json');

var HardEvent = require('../models/hard_event.js');
var FlexEvent = require('../models/flex_event.js');
var Constraint = require('../models/constraint.js');

var hardEvents = HardEvent.fromJSON(data.hard);
var constraints = Constraint.fromJSON(data.constraint);
var flex = FlexEvent.fromJSON(data.flex);
var x = new ScheduleBuilderController(hardEvents, flex, constraints);
x.buildSchedules();

var node = x.tree._root;

var pickLeft = false;
while(node != null) {
    console.log(node.newEvent);
    if (pickLeft) {
        node = node.leftChild;
    } else {
        node = node.rightChild;
    }
    pickLeft = !pickLeft;
}
