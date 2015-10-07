//MODULE
var erpagWeather=angular.module('erpagWeather',['ngRoute','ngResource','auth0','angular-storage', 'angular-jwt'])
.config(function (authProvider) {
  authProvider.init({
    domain: 'myday.eu.auth0.com',
    clientID: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl'
  });
})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});