'use strict';

angular.module('Zuller')
  .controller('LoginCtrl', ['$scope','$location', 'facebookSdk',
    function($scope, $location, facebookSdk){
      facebookSdk.$on('fb_status_changed', function(event, status, fb_user_id, response){
          if (status === 'connected')
             $location.path('/question');
      });

      $scope.continue = function(){
          $location.path('/question');
      }

      $scope.facebookLogin = function(){
          facebookSdk.login();
      }
    }]);