//MODULE Angular
var erpagWeather=angular.module('erpagWeather',['ngRoute','ngResource','ngAnimate','ngAria','ngMaterial','auth0','angular-storage', 'angular-jwt']);

erpagWeather.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
    console.log('step0001');
});
 
//config app
erpagWeather.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // ...
  authProvider.init({
    domain: 'myday.eu.auth0.com',
    clientID: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl',
    loginUrl: 'https://myday.eu.auth0.com/login?client=oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl'
  });
    
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
