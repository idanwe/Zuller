'use strict';


// Declare app level module which depends on filters, and services
angular.module('Zuller', ['ngRoute', 'LocalStorageModule'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
      .when('/questions', { templateUrl: 'views/questions.html', controller: 'QuestionsCtrl'})
      .when('/login', { templateUrl: 'views/login.html', controller: 'LoginCtrl' })
      .when('/bars/:barId',{ templateUrl: 'views/bar.html', controller: 'BarCtrl'})
      .when('/parties/:partyId',{ templateUrl: 'views/party.html', controller: 'PartyCtrl'})
	  .otherwise({ redirectTo: '/'});
  }]);



