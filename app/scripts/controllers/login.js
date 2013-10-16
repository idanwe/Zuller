'use strict';

angular.module('Zuller')
  .controller('LoginCtrl', ['$scope','$location', 'Security', 'User', 'facebookSdk', '$rootScope',
    function($scope, $location, Security, User, facebookSdk, $rootScope){

      var next = function(event, is_new_user, user) {
        if (is_new_user) {
          $location.path('/questions');
        } else {
          $location.path('/');
        }
      }

      $rootScope.$on('user_registered', next);

      $scope.continue = function(){
        Security.register(User.getDeviceId())
      }

      $scope.facebookLogin = function(){
        facebookSdk.login();
      }
    }]);