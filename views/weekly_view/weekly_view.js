'use strict';

(function () {
	angular
		.module('app.weeklyView', ['ngRoute'])
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
		}]);
})();
