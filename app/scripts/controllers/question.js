'use strict';

angular.module('Zuller')
    .controller('QuestionCtrl', ['$scope', '$location','$http', function($scope, $location,$http) {

        $scope.currentQuestionIdx = undefined;
        $scope.currentAnswers = [1,2,3];

        $scope.chosenMusic = [];
        $scope.chosenAreas = [];
        $scope.chosenDrink = [];


        $scope.onFinish = function(){
          //Create request to http to update server
        }

        $scope.onAnswerClicked = function(imgName){

          function updateAnswer(imgName, answers){
            if (imgName in answers)
              answers.splice(answers.indexOf(imgName), 1);
            else
              answers.splice(0,0, imgName);
          }

          switch (currentQuestionIdx){
            case 1:
              updateAnswer(imgName, chosenMusic);
            case 2:
              updateAnswer(imgName, chosenAreas);
            case 3:
              updateAnswer(imgName, chosenDrink);
          }
          //add or remove from chosen array for the specified question
        }
    }]);
