'use strict';

angular.module('Zuller')
    .controller('ZullerMyNightCtrl', ['$scope', '$http', '$location', 'sharedProperties', 'serverUrl',
        function($scope, $http, $location, sharedProperties, serverUrl) {

        $scope.templateUrl = 'views/zuller-my-night.html';

        $http({ method: 'JSONP', url: serverUrl + '/zuller_my_night.js?callback=JSON_CALLBACK' }).success(function(data) {

            $scope.parties = data.parties;
            $scope.bars = data.bars;
            $scope.category = 'bars';

            $scope.onPartyClicked = function(party) {
                sharedProperties.setCurrentParty(party);
                $location.path('parties/' + party._id);
            };

            $scope.onBarClicked = function(bar) {
                sharedProperties.setCurrentBar(bar);
                $location.path('bars/' + bar._id);
            };
        })
    }]);