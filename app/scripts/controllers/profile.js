angular.module('Zuller')
    .controller('ProfileCtrl', ['$scope', 'facebookSdk', function($scope, facebookSdk) { // TODO: add User service
        $scope.templateUrl = 'views/profile.html';
        $scope.loggedIn = false;
        $scope.login = facebookSdk.login;
        $scope.logout = facebookSdk.logout;
        facebookSdk.$on('fb_status_changed', function(event, status, fb_user_id, response) {
          $scope.loggedIn = status == "connected";
        })
    }]);