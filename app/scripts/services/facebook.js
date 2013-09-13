angular.module('Zuller').service('facebookSdk', function (facebookAppId, $rootScope, $window, $q) {
  // Create a scope
  var $fbScope = $rootScope.$new();

  $window.fbAsyncInit = function () {
    FB.init({
      appId: facebookAppId,
      channelUrl : '//localhost:3000/channel.html', // Channel File
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true  // parse XFBML
    });

    var rootScope = angular.element("#ng-app").scope();
    $rootScope.$broadcast("fb_ready")
  };

  (function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  } (document));

  $rootScope.$on("fb_ready", function () {
    FB.getLoginStatus(function (response) {
      if (response.authResponse) {
        $rootScope.$broadcast("fb_status_changed", response.status, response.authResponse.userID, response);
      } else {
        $rootScope.$broadcast("fb_status_changed", response.status, null, response);
      }
    });
  });

  $fbScope.getLoginStatus = function () {
    var deferred = $q.defer();

    // check what is user current login status
    FB.getLoginStatus(function (response) {
      deferred.resolve(response.status);
    });

    return deferred.promise;
  };

  $fbScope.login = function () {
    var deferred = $q.defer();

    FB.login(function (response) {

      if (response.authResponse) {
        deferred.resolve(response.status);
        // connected
        $rootScope.$broadcast("fb_status_changed", response.status, response.authResponse.userID, response);
      } else {
        deferred.reject(response.status);
        // cancelled
      }

      $fbScope.getLoginStatus();
    }, { scope: 'email,publish_stream' });

    return deferred.promise;
  };

  $fbScope.logout = function () {
    var deferred = $q.defer();

    FB.logout(function (response) {
      deferred.resolve(response.status);
      $rootScope.$broadcast("fb_status_changed", response.status, response.authResponse.userID, response);
    });

    return deferred.promise;
  };

  $fbScope.getUser = function () {
    var deferred = $q.defer();

    FB.api('/me', function (response) {
      if (response.error) {
        deferred.reject(response);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  };

  return $fbScope;
});