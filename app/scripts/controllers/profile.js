angular.module('Zuller')
    .controller('ProfileCtrl', ['$scope', 'facebookSdk', 'Security', function($scope, facebookSdk, Security) { // TODO: add User service
        // Security.register({ });
        // User.setUserDetails({ id: 'the id', fb_user_id: 'fb_ user id'})
        $scope.templateUrl = 'views/profile.html';
        $scope.loggedIn = false;
        $scope.login = facebookSdk.login;
        $scope.logout = facebookSdk.logout;
        facebookSdk.$on('fb_status_changed', function(event, status, fb_user_id, response) {
          $scope.loggedIn = status == "connected";
        })
    }]);