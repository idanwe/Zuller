angular.module('Zuller')
    .controller('ProfileCtrl', ['$scope', 'facebookSdk', function($scope, facebookSdk) {
        $scope.templateUrl = 'views/profile.html';
        $scope.logout = facebookSdk.logout;
    }]);