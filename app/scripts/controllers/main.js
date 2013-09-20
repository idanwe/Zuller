'use strict';

angular.module('Zuller')
    .controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      $scope.viewLoaded = [];
      $rootScope.$on('$includeContentLoaded', function(event){
        $scope.viewLoaded.push(event.targetScope.name);
        if ($scope.viewLoaded.length === 4) {
          var verticalCarousel = new VerticalCarousel("#vertical-carousel");
          verticalCarousel.init();
          var horizontalCarousel = new HorizontalCarousel("#carousel", "#bg-carousel", verticalCarousel);
          horizontalCarousel.init();
        }
      })

    }]);