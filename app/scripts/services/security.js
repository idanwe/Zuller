'use strict';

angular.module('Zuller').service('Security', // $state
  ['$http', '$q', '$rootScope','serverUrl', 'facebookSdk', 'User',
    function($http, $q, $rootScope, serverUrl, facebookSdk, User) {

      var self = this;

      facebookSdk.$on('fb_status_changed', function(event, status, fb_user_id, response) {
        if (status == 'connected') {
          var data = {
            // device_id: User.device_id,
            fb_user_id: fb_user_id,
            fb_token: response.authResponse.accessToken
          };
          self.register(data);
        }
      });
      /**
       * Executes register attempt
       * @param device_id
       * @param fb_name
       * @param fb_user_id
       * @param fb_token
       * @param age
       * @param area_preferences
       * @param drinking_preferences
       * @param musical_preferences
       * @returns {*|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|Function|Function|promise|Function|Function|promise|Function|Function|promise|Function|Function|promise|promiseContainer.promise|promise|Q.promise|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function}
       */
      this.register = function(data) {
        var deferred = $q.defer();

        var uri = serverUrl + '/app_users.json';

        $http.post(uri, data)
          .success(function (user, status) {
            User.setUserDetails(user);
            $rootScope.$broadcast('user_registered', user.is_new, user);
            deferred.resolve(user);
          }).error(function (data, status) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      this.update = function(data) {
        var deferred = $q.defer();
        data.fb_user_id = User.fb_user_id
        // data.device_id = User.device_id TODO: device_id
        var uri = serverUrl + '/app_users.json';

        $http.post(uri, data)
          .success(function (user, status) {
            User.setUserDetails(user);
            $rootScope.$broadcast('user_updated', user.is_new, user);
            deferred.resolve(user);
          }).error(function (data, status) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      /**
       * Check if there is auth token and if its still valid
       */
      this.loginStatus = function(token) {
        var deferred = $q.defer();

        var uri = serverUrl + 'sessions/show/' + token;

        $http.get(uri)
          .success(function (response, status) {
            console.log('loginStatus Success');
            console.log(response);
            deferred.resolve(response);
          }).error(function (data, status) {
            console.log('loginStatus Error');
            console.log(data);
            deferred.reject(data);
          });

        return deferred.promise;
      }

      /**
       * Executes login attempt
       * @param email
       * @param password
       * @returns {*|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|Function|Function|promise|Function|Function|promise|Function|Function|promise|Function|Function|promise|promiseContainer.promise|promise|Q.promise|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function}
       */
      this.login = function(email, password) {
        var deferred = $q.defer();

        var uri = serverUrl + 'sessions/sign_in';
        var data = {'email': email, 'password': password};

        $http.post(uri, data)
          .success(function (user, status) {
            User.setUserDetails(user.id, user.email, user.auth_token, user.balance);
            deferred.resolve(user);
          }).error(function (data, status) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      /**
       * Executes login attempt
       * @param email
       * @param password
       * @returns {*|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|promise|Function|Function|promise|Function|Function|promise|Function|Function|promise|Function|Function|promise|promiseContainer.promise|promise|Q.promise|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function}
       */
      this.logout = function() {
        var deferred = $q.defer();

        var uri = serverUrl + 'sessions/sign_out';

        $http.delete(uri)
          .success(function (response, status) {
            User.clearUser();
            deferred.resolve(response);
          }).error(function (data, status) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      this.checkSession = function(wantedState) {
        var deferred = $q.defer();
        var self = this;

        if (User.load()) {
          self.loginStatus(User.auth_token).then(function() {
            if (angular.isDefined(wantedState)) {
              $state.transitionTo(wantedState);
            }
            deferred.resolve(User);
          },
          function (response) {
            $state.transitionTo('unauthorized');
            deferred.reject(response);
          });
        } else {
          $state.transitionTo('unauthorized');
          deferred.reject();
        }

        return deferred.promise;
      }


      this.reload = function() {
        var deferred = $q.defer();
        var self = this;
        var uri = serverUrl + 'users/' + User.id;

        $http.get(uri)
          .success(function (user, status) {
            User.setUserDetails(user.id, user.email, user.auth_token, user.balance);
            deferred.resolve(user);
          }).error(function (data, status) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

}]);