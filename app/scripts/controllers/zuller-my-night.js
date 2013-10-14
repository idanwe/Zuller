'use strict';

angular.module('Zuller')
    .controller('ZullerMyNightCtrl', ['$scope', '$http', '$location', 'sharedProperties', 'serverUrl',
        function($scope, $http, $location, sharedProperties, serverUrl) {

        $scope.templateUrl = 'views/zuller-my-night.html';

        var uri = serverUrl + '/zuller_my_night.json';
        $http.get(uri).success(function(data) {

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