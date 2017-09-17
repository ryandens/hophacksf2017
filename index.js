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
			vm.title = '';

			vm.onSubmit = function() {
				console.log(vm.title);
			}
		})
})();
