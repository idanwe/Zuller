'use strict';

angular.module('Zuller')
    .controller('DetailedPartyCtrl', ['$scope','$routeParams', 'sharedProperties',
        function($scope, $routeParams,sharedProperties){

        $scope.party = sharedProperties.getCurrentParty();

    }]);