'use strict';

angular.module('Zuller')
    .controller('EventsCtrl', ['$scope', '$http', '$location', 'sharedProperties', 'serverUrl',
        function($scope, $http, $location, sharedProperties, serverUrl) {

        $scope.templateUrl = 'views/events.html';

        var uri = serverUrl + '/parties.json';
        $http.get(uri).success(function(data) {
            $scope.parties = data;
        });

        $scope.onPartyClicked = function(party) {
            sharedProperties.setCurrentParty(party);
            $location.path('parties/' + party._id);
        };
    }]);