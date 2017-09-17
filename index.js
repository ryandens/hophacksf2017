'use strict';

(function() {
    angular
        .module('app', ['ngRoute',
            "ui.calendar",
            'app.weeklyView'
        ])
        .config(['$locationProvider', function($locationProvider) {
            //$locationProvider.hashPrefix("");
        }])
        .controller('mainController', function($http) {})
		.controller('addTaskController', function() {
			var vm = this;
			vm.title, vm.description, vm.location, vm.length, vm.morning = false, vm.afternoon = false, vm.evening = false, vm.completeBy;

			vm.onSubmit = function() {
				console.log(vm.title);
				console.log(vm.description);
				console.log(vm.location);
				console.log(vm.length);
				console.log(vm.morning);
				console.log(vm.afternoon);
				console.log(vm.evening);
				console.log(vm.completeBy);
			}
		})
})();
