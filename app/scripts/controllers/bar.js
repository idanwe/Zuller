'use strict';

angular.module('Zuller')
    .controller('DetailedBarCtrl', ['$scope','$routeParams','sharedProperties',
        function($scope, $routeParams, sharedProperties){

        $scope.bar = sharedProperties.getCurrentBar();

    }]);