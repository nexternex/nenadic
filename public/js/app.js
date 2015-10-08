//MODULE
var erpagWeather=angular.module('erpagWeather',['ngRoute','ngResource']);

angular.module('erpagWeather', ['auth0', 'angular-storage', 'angular-jwt']);

erpagWeather.config(function (authProvider) {

  authProvider.init({
    domain: 'myday.eu.auth0.com',
    clientID: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl'
  });
})

erpagWeather.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
    console.log('step0001');
});


erpagWeather.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // ...

  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
  // ...
});

erpagWeather.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/index');
          console.log("error location changer")
      }
    }
  });
});

erpagWeather.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function () {
      // Error callback
    });
  };
  $scope.logout = function() {
  auth.signout();
  store.remove('profile');
  store.remove('token');
  };
     console.log('pokusaj login controller used')
}]);