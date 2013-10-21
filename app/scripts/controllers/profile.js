angular.module('Zuller')
    .controller('ProfileCtrl', ['$scope', 'facebookSdk', 'User', function($scope, facebookSdk, User) {
        $scope.templateUrl = 'views/profile.html';
        $scope.loggedIn = false;
        $scope.login = facebookSdk.login;
        $scope.logout = facebookSdk.logout;

        $scope.have_musics = function() {
          return User.favorite_music.length > 0;
        };

        $scope.have_beverages = function() {
          return User.favorite_beverage.length > 0;
        };

        facebookSdk.$on('fb_status_changed', function(event, status, fb_user_id, response) {
          $scope.loggedIn = status == "connected";

          facebookSdk.getUser().then(function(res) {
            res.img_url = "http://graph.facebook.com/"+res.id+"/picture";
            $scope.res = res;
            $scope.user = User;
          });
        })
    }]);