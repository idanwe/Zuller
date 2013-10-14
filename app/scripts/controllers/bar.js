'use strict';

angular.module('Zuller')
    .controller('BarCtrl', ['$scope','$routeParams','sharedProperties',
        function($scope, $routeParams, sharedProperties){
        $scope.bar = sharedProperties.getCurrentBar();

    }]);