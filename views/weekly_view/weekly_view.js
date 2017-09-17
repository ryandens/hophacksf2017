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
			vm.events = [];
			vm.eventSources = [vm.events];
			console.log(vm.eventSources);

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
			        {"title": "Prob Stat", "description": "Prob Stat Class", "location": "Schaffer Hall", "startTime": "Mon Sep 18 2017 11:00:00 GMT-0500 (STD)", "endTime": "Mon Sep 18 2017 11:50:00 GMT-0500 (STD)"},
			        {"title": "Prob Stat", "description": "Prob Stat Class", "location": "Schaffer Hall", "startTime": "Wed Sep 20 2017 11:00:00 GMT-0500 (STD)", "endTime": "Wed Sep 20 2017 11:50:00 GMT-0500 (STD)"},
			        {"title": "Prob Stat", "description": "Prob Stat Class", "location": "Schaffer Hall", "startTime": "Thu Sep 22 2017 11:00:00 GMT-0500 (STD)", "endTime": "Thu Sep 22 2017 11:50:00 GMT-0500 (STD)"},
			        {"title": "Prob Stat Section", "description": "Prob Stat Section", "location": "Hodson Hall", "startTime": "Tue Sep 19 2017 15:00:00 GMT-0500 (STD)", "endTime": "Tue Sep 19 2017 15:50:00 GMT-0500 (STD)"},
			        {"title": "Practical Cryptographic Systems", "description": "Practical Crypto Class", "location": "Ames Hall", "startTime": "Mon Sep 18 2017 20:00:00 GMT-0500 (STD)", "endTime": "Tue Sep 19 2017 00:50:00 GMT-0500 (STD)"},
			        {"title": "Practical Cryptographic Systems", "description": "Practical Crypto Class", "location": "Ames Hall", "startTime": "Wed Sep 20 2017 12:00:00 GMT-0500 (STD)", "endTime": "Wed Sep 20 2017 12:50:00 GMT-0500 (STD)"},
			        {"title": "Practical Cryptographic Systems", "description": "Practical Crypto Class", "location": "Ames Hall", "startTime": "Fri Sep 22 2017 12:00:00 GMT-0500 (STD)", "endTime": "Fri Sep 22 2017 12:50:00 GMT-0500 (STD)"},
			        {"title": "Good Vibrations", "description": "Good Vibratons Class", "location": "Hodson Hall", "startTime": "Tue Sep 19 2017 10:30:00 GMT-0500 (STD)", "endTime": "Tue Sep 19 2017 11:45:00 GMT-0500 (STD)"},
			        {"title": "Good Vibrations", "description": "Good Vibratons Class", "location": "Maryland Hall", "startTime": "Thu Sep 21 2017 10:30:00 GMT-0500 (STD)", "endTime": "Thu Sep 21 2017 11:45:00 GMT-0500 (STD)"},
			        {"title": "CS Innovation & Entrepreneurship", "description": "CSIE Class", "location": "Malone Hall", "startTime": "Tue Sep 19 2017 16:30:00 GMT-0500 (STD)", "endTime": "Tue Sep 19 2017 17:45:00 GMT-0500 (STD)"},
			        {"title": "CS Innovation & Entrepreneurship", "description": "CSIE Class", "location": "Malone Hall", "startTime": "Thu Sep 21 2017 16:30:00 GMT-0500 (STD)", "endTime": "Thu Sep 21 2017 17:45:00 GMT-0500 (STD)"},
			        {"title": "Work", "description": "Work", "location": "3600 O'Donnel St Baltimore, MD", "startTime": "Wed Sep 20 2017 13:45:00 GMT-0500 (STD)", "endTime": "Wed Sep 20 2017 18:00:00 GMT-0500 (STD)"},
			        {"title": "Work", "description": "Work", "location": "3600 O'Donnel St Baltimore, MD", "startTime": "Thu Sep 21 2017 12:15:00 GMT-0500 (STD)", "endTime": "Thu Sep 21 2017 18:00:00 GMT-0500 (STD)"},
			        {"title": "Work", "description": "Work", "location": "3600 O'Donnel St Baltimore, MD", "startTime": "Thu Sep 21 2017 12:30:00 GMT-0500 (STD)", "endTime": "Thu Sep 21 2017 18:00:00 GMT-0500 (STD)"}
			    ];


			function formatDates(input) {
				var result = [];

				for (var i = 0; i < input.length; i++) {
					var currEvent = input[i];
					currEvent.startTime = new Date(currEvent.startTime);
					currEvent.endTime = new Date(currEvent.endTime);

					// If event begins and ends on different dates
					if (currEvent.startTime.getDate() !== currEvent.endTime.getDate()) {
						var splitDate = new Date(currEvent.endTime.getFullYear(), currEvent.endTime.getMonth(), currEvent.endTime.getDate());

						// split the event into two events at midnight
						var splitOne = {
							...currEvent,
							endTime: splitDate
						};

						var splitTwo = {
							...currEvent,
							startTime: splitDate
						};

						// add both events to new array
						result.push(splitOne);
						result.push(splitTwo);
					} else {
						result.push(currEvent);
					}
				}

				result = result.sort(compareEvents);



			};

			function compareEvents(a,b) {
				if (a.startTime < b.startTime) {
					return -1;
				}
				if (a.startTime > b.startTime) {
					return 1;
				}
				return 0;
			}

			vm.schedule = formatDates(data);
		}]);
})();
