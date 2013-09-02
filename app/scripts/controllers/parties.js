'use strict';

angular.module('Zuller')
    .controller('PartiesCtrl', ['$scope', '$http', '$location', 'sharedProperties', 'serverUrl',
        function($scope, $http, $location, sharedProperties, serverUrl) {

        $scope.templateUrl = 'views/parties.html';

        $scope.onPartyClicked = function(party) {
            sharedProperties.setCurrentParty(party);
            $location.path('parties/' + party._id);
        };

        $http({ method: 'JSONP', url: serverUrl + '/parties.js?callback=JSON_CALLBACK' }).success(function(data) {
            $scope.parties = data;
        });
    }]);