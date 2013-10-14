'use strict';

angular.module('Zuller')
    .controller('PartyCtrl', ['$scope','$routeParams', 'sharedProperties',
        function($scope, $routeParams,sharedProperties){

        $scope.party = sharedProperties.getCurrentParty();

    }]);