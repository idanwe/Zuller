'use strict';

angular.module('Zuller')
  .controller('LoginCtrl', ['$scope','$location', 'Security', 'User', 'facebookSdk', '$rootScope',
    function($scope, $location, Security, User, facebookSdk, $rootScope){

      var next = function() {
        if (User.favorite_music.length === 0) { // TODO: User.is_new
          $location.path('/questions');
        } else {
          $location.path('/');
        }
      }

      $rootScope.$on('user_registered', function(event) {
        next();
      });

      $scope.continue = function(){
        next();
      }

      $scope.facebookLogin = function(){
        facebookSdk.login();
      }
    }]);