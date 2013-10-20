'use strict';

angular.module('LocalStorageModule').value('prefix', 'zuller');
angular.module('Zuller').service('User', ['localStorageService', function(localStorageService) {
  var self = this;

  // self.auth_token = null; TODO: add auth_token
  self.id = null;
  self.device_id = null;

  self.fb_user_id = null;
  self.fb_token = null;
  self.fb_user_name = null;

  self.age = null;
  self.area = [];
  self.favorite_beverage = [];
  self.favorite_music = [];

  this.alerts = [];

  this.setUserDetails = function(data) {
    if(data.id) self.id = data.id;
    if(data.device_id) self.device_id = data.device_id;

    if(data.fb_user_id) self.fb_user_id = data.fb_user_id;
    if(data.fb_token) self.fb_token = data.fb_token;
    if(data.fb_user_name) self.fb_user_name = data.fb_user_name;

    if(data.age) self.age = data.age;
    if(data.area) self.area = data.area;
    if(data.favorite_beverage) self.favorite_beverage = data.favorite_beverage;
    if(data.favorite_music) self.favorite_music = data.favorite_music;

    localStorageService.add('zuller.user', data);
  }

  this.clearUser = function() {
    localStorageService.remove('zuller.user');
    self.id = null;
    self.device_id = null;

    self.fb_user_id = null;
    self.fb_token = null;
    self.fb_user_name = null;

    self.age = null;
    self.area = null;
    self.favorite_beverage = null;
    self.favorite_music = null;
  }

  // this.isAuthenticated = function() {
  //   return angular.isDefined(self.auth_token) && self.auth_token !== null;
  // }

  /**
   * In case there is no auth_token, try to load it from the localStorage
   *
   * @returns {boolean}
   */
  this.load = function() {
    // if (self.auth_token !== null) {
    //   return true;
    // }

    var user = localStorageService.get('zuller.user');
    if (user !== null) {
      self.id = user.id;
      // self.auth_token = user.auth_token;
      return true;
    }

    return false;
  }

  this.getDeviceId = function() {

  }

  this.addAlert = function(type, msg, title) {
    this.alerts.push({type: type, msg: msg, title: title});
  }

  this.removeAlert = function(index) {
    this.alerts.splice(index);
  }

  this.clearAlerts = function() {
    this.alerts = [];
  }
}]);