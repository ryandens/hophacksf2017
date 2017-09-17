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
        .controller('mainController', function($http) {});
})();
