'use strict';

angular.module('Zuller')
    .controller('QuestionsCtrl', ['$scope', '$location','$http', '$rootScope', 'User', 'Security', function($scope, $location, $http, $rootScope, User, Security) {
        // var answers = {
        //   beverage: ['וודקה', 'עראק', 'ויסקי', 'בירה', 'יין'],
        //   music: ['רוק', 'אינדי', 'ישראלית', 'אלטרנטיבי', 'פופ'],
        //   area: ['תל אביב', 'הרצליה', 'ירושלים', 'אשקלות']
        // };

        var answers = {
          beverage: ['vodka', 'arak', 'wiskey', 'beer', 'wine'],
          music: ['rock', 'indie', 'isreali', 'alternative', 'pop'],
          area: ['tel aviv', 'herzelia', 'jerusalem', 'ashkelon']
        };

        function composeAnswers(q) {
          var aws = answers[q];
          var answersObj = []
          for (var i in aws) {
            answersObj.push({ chosen: false, text: aws[i] });
          }
          return answersObj;
        };

        function getChosenQuestions(key) {
          var chosens = [];
          for (var i in $scope.currentAnswers) {
            var answer = $scope.currentAnswers[i]
            if (answer.chosen) chosens.push(answer.text);
          }
          return chosens;
        }

        $rootScope.$on('user_updated', function(event){
          $location.path('/');
        });

        // var questionsToAsk = [
        //   { key: 'beverage', text: 'מה אתה אוהב לשתות?'},
        //   { key: 'music', text: 'איזה סוגי מוזיקה אתה שומע?'},
        //   { key: 'area', text: 'באיזה אזור אתה מבלה?'}
        // ];
        var questionsToAsk = [
          { key: 'beverage', text: 'what do you like drink?'},
          { key: 'music', text: 'what is your music favorites?'},
          { key: 'area', text: 'your area?'}
        ];

        $scope.currentQuestionId = 0;
        $scope.currentQuestion = questionsToAsk[$scope.currentQuestionId];
        $scope.currentAnswers = composeAnswers($scope.currentQuestion.key);

        var chosenAnswers = {};

        $scope.onAnswerClicked = function(answer){
          answer.chosen = !answer.chosen;
        }

        $scope.next = function() {
          chosenAnswers[$scope.currentQuestion.key] = getChosenQuestions();
          if (++$scope.currentQuestionId === questionsToAsk.length) {
            var data = {
              // TODO: device_id
              fb_user_id: User.fb_user_id,
              favorite_beverage: chosenAnswers.beverage,
              favorite_music: chosenAnswers.music,
              area: chosenAnswers.area
            };
            Security.update(data);
          } else {
            var nextQ = questionsToAsk[$scope.currentQuestionId];
            $scope.currentQuestion = nextQ;
            $scope.currentAnswers = composeAnswers(nextQ.key);
          }
        }
    }]);
