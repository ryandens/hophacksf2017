'use strict';

(function () {
	angular
		.module('app.weeklyView', ['ngRoute', 'ui.calendar'])
		.config(['$routeProvider', function($routeProvider) {
            $routeProvider
				.when('/', {
					templateUrl: 'views/weekly_view/weekly_view.html',
					controller: 'weeklyViewController as vm'
				})
				.otherwise({
					redirectTo: '/'
				})
		}])
		.controller('weeklyViewController',[ function() {
		    var vm = this;
			vm.hello = 'test';

			/* config object */
		    vm.uiConfig = {
		      calendar:{
		        height: 800,
		        editable: true,
		        header:{
		          left: 'month agendaWeek agendaDay',
		          center: 'title',
		          right: 'today prev,next'
		        },
				defaultView: 'agendaWeek',
				allDaySlot: false,
		        dayClick: vm.alertEventOnClick,
		        eventDrop: vm.alertOnDrop,
		        eventResize: vm.alertOnResize
		      }
		    };

			vm.alertEventOnClick = function() {
				console.log("alertEventOnClick");
			}

			vm.eventDrop = function() {
				console.log("event drop");
			}

			vm.eventResize = function() {
				console.log("event resize");
			}

			var data = [
				{"title": "Prob Stat", "description": "Prob Stat Class", "location": "Schaffer Hall", "start": "Mon Sep 18 2017 11:00:00 GMT-0500 (STD)", "end": "Mon Sep 18 2017 11:50:00 GMT-0500 (STD)", "type": "HARD_EVENT"},
				{"title": "Prob Stat", "description": "Prob Stat Class", "location": "Schaffer Hall", "start": "Wed Sep 20 2017 11:00:00 GMT-0500 (STD)", "end": "Wed Sep 20 2017 11:50:00 GMT-0500 (STD)", "type": "HARD_EVENT"},
				{"title": "Prob Stat", "description": "Prob Stat Class", "location": "Schaffer Hall", "start": "Thu Sep 22 2017 11:00:00 GMT-0500 (STD)", "end": "Thu Sep 22 2017 11:50:00 GMT-0500 (STD)", "type": "HARD_EVENT"},
				{"title": "Prob Stat Section", "description": "Prob Stat Section", "location": "Hodson Hall", "start": "Tue Sep 19 2017 15:00:00 GMT-0500 (STD)", "end": "Tue Sep 19 2017 15:50:00 GMT-0500 (STD)", "type": "HARD_EVENT"},
				{"title": "Practical Cryptographic Systems", "description": "Practical Crypto Class", "location": "Ames Hall", "start": "Mon Sep 18 2017 20:00:00 GMT-0500 (STD)", "end": "Tue Sep 19 2017 00:50:00 GMT-0500 (STD)", "type": "HARD_EVENT"},
				{"title": "Practical Cryptographic Systems", "description": "Practical Crypto Class", "location": "Ames Hall", "start": "Wed Sep 20 2017 12:00:00 GMT-0500 (STD)", "end": "Wed Sep 20 2017 12:50:00 GMT-0500 (STD)", "type": "HARD_EVENT"},
				{"title": "Practical Cryptographic Systems", "description": "Practical Crypto Class", "location": "Ames Hall", "start": "Fri Sep 22 2017 12:00:00 GMT-0500 (STD)", "end": "Fri Sep 22 2017 12:50:00 GMT-0500 (STD)", "type": "FLEX_EVENT"},
				{"title": "Good Vibrations", "description": "Good Vibratons Class", "location": "Hodson Hall", "start": "Tue Sep 19 2017 10:30:00 GMT-0500 (STD)", "end": "Tue Sep 19 2017 11:45:00 GMT-0500 (STD)", "type": "FLEX_EVENT"},
				{"title": "Good Vibrations", "description": "Good Vibratons Class", "location": "Maryland Hall", "start": "Thu Sep 21 2017 10:30:00 GMT-0500 (STD)", "end": "Thu Sep 21 2017 11:45:00 GMT-0500 (STD)", "type": "FLEX_EVENT"},
				{"title": "CS Innovation & Entrepreneurship", "description": "CSIE Class", "location": "Malone Hall", "start": "Tue Sep 19 2017 16:30:00 GMT-0500 (STD)", "end": "Tue Sep 19 2017 17:45:00 GMT-0500 (STD)", "type": "FLEX_EVENT"},
				{"title": "CS Innovation & Entrepreneurship", "description": "CSIE Class", "location": "Malone Hall", "start": "Fri Sep 22 2017 16:30:00 GMT-0500 (STD)", "end": "Fri Sep 22 2017 17:45:00 GMT-0500 (STD)", "type": "FLEX_EVENT"},
				{"title": "Work", "description": "Work", "location": "3600 O'Donnel St Baltimore, MD", "start": "Wed Sep 20 2017 13:45:00 GMT-0500 (STD)", "end": "Wed Sep 20 2017 18:00:00 GMT-0500 (STD)", "type": "FLEX_EVENT"},
				{"title": "Work", "description": "Work", "location": "3600 O'Donnel St Baltimore, MD", "start": "Thu Sep 21 2017 12:15:00 GMT-0500 (STD)", "end": "Thu Sep 21 2017 18:00:00 GMT-0500 (STD)", "type": "FLEX_EVENT"}
			];

			vm.eventSources = [formatDates(data)];

			function formatDates(input) {
				var result = [];

				for (var i = 0; i < input.length; i++) {
					var currEvent = input[i];
					currEvent.start = new Date(currEvent.start);
					currEvent.end = new Date(currEvent.end);
					if (currEvent.type === "HARD_EVENT") {
						currEvent.color = 'blue';
					} else if (currEvent.type === "FLEX_EVENT") {
						currEvent.color = 'orange';
					}
					result.push(currEvent);
				}
				return result.sort(compareEvents);
			};

			function compareEvents(a,b) {
				if (a.start < b.start) {
					return -1;
				}
				if (a.start > b.start) {
					return 1;
				}
				return 0;
			}

		}]);
})();
