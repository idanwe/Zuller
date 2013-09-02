angular.module('Zuller')
    .controller('ProfileCtrl', ['$scope', '$window', function($scope, $window) {
        $scope.templateUrl = 'views/profile.html';
        $scope.logout = $window.logout;
    }]);