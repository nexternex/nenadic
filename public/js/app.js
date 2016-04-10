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
    loginUrl: '/login'
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

//erpagWeather.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',
//function ($scope, $http, auth, store, $location) {
//  $scope.login = function () {
//    auth.signin({}, function (profile, token) {
//      // Success callback
//      store.set('profile', profile);
//      store.set('token', token);
//      $location.path('/');
//    }, function () {
//      // Error callback
//        console.log('err logoin controller used');
//    });
//  };
//  $scope.logout = function() {
//  auth.signout();
//  store.remove('profile');
//  store.remove('token');
//  };
//     console.log('pokusaj logoin controller used');
//}]);


//////////////////////LIST ctrl///////////////////////////////////////////////
//erpagWeather.controller('listController', function ($scope, $http) {
//    
//    console.log("aktiviran list controller");
//        ///file upload controler///
//    $scope.formData = {};
//    // when landing on the page, get all lists and show them
//    $http.get('/api/lists')
//        .success(function(data) {
//            $scope.users = data;
//            console.log('lsite iz baze'+data);
//          
//            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
//                    //you also get the actual event object
//                    //do stuff, execute functions -- whatever...
//                    console.log('sad funcija');
//                });
//        })
//        .error(function(data) {
//            console.log('Error: ' + data);
//        });
//
//    // when submitting the add form, send the text to the node API
//    $scope.createUser = function() {
//       
//        $http.post('/api/lists', $scope.formData)
//            .success(function(data) {
//                $scope.formData = {}; // clear the form so our user is ready to enter another
//                $scope.users = data;
//                // console.log(data+"users");
//                alert("uspesno ste registrovali nalog sa app strane");
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//
//    // delete a todo after checking it
//    $scope.deleteUser = function(id) {
//        alert(id);
//        $http.delete('/api/lists/' + id)
//            .success(function(data) {
//                $scope.users = data;
//                console.log("obrisao");
//            })
//            .error(function(data) {
//                console.log('Error: ' + data);
//            });
//    };
//        
//});

//end of MAIN controller