//MODULE Angular
var myDay=angular.module('myDay',['ngRoute','ngResource','ngAnimate','ngAria','ngMaterial','auth0','angular-storage', 'angular-jwt','md.data.table']);

myDay.run(function(auth,$rootScope) {
  // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();
    $rootScope.up ="";
    $rootScope.heart = false;
});
 
//config app
myDay.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider,jwtOptionsProvider,$mdThemingProvider,$mdIconProvider) {
  
  authProvider.init({
      domain: 'myday.eu.auth0.com',
      clientID: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl',
      loginUrl: '/index'
    });

    jwtOptionsProvider.config({
      whiteListedDomains: ['nenadic.herokuapp.com', 'spreadsheets.google.com']
    });
    
    
  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');

  // Tema aplikacije Angular Theming
  $mdIconProvider.defaultIconSet('../fonts/mdi.svg'); 
  $mdThemingProvider.theme('default')
    .primaryPalette('purple',  {                  
    'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> cla
                    })
    .backgroundPalette('grey', {
    'default': '50', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> cla
                    })
    .accentPalette('green');
});

myDay.run(function($rootScope, auth, store, jwtHelper, $location) {
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
        $location.path('/');
          console.log("error location changer")
      }
    }
  });
});
//  Filtriranje liste u zavisnosti od lajkova
myDay.filter('myFilter', function () {
   return function(inputs,filterValues) {
     if(filterValues==""){
        return inputs;
     }else{
      var output = [];
      angular.forEach(inputs, function (input) {
        if (filterValues.indexOf(input.gsx$id.$t) !== -1)
            output.push(input);
       });
       return output;
     }
   };
});