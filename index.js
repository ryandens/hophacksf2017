'use strict';

(function() {
    angular
        .module('app', ['ngRoute',
            'app.weeklyView'
        ])
        .config(['$locationProvider', function($locationProvider) {
            //$locationProvider.hashPrefix("");
        }])
        .controller('mainController', function($http) {});
})();
