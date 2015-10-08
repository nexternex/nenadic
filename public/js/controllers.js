//CONTROLERS
erpagWeather.controller('homeController',['$scope','cityService' ,function($scope,cityService){

    $scope.city=cityService.city;
    $scope.$watch('city', function(){
        cityService.city=$scope.city
    });

}]);

erpagWeather.controller('forecastController',['$scope','$resource','cityService' ,function($scope,$resource,cityService){

    $scope.city=cityService.city;
    
    $scope.weatherAPI=$resource("http://openweathermap.org/data/2.5/forecast/daily", {
        callback:"JSON_CALLBACK"},{get:{method:"JSONP"}
    });

    $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt:2});

    $scope.convertToDeg=function(degK){
        return Math.round(degK-273);
    };
    
    $scope.convertToDate=function(dt){
        return new Date(dt*1000);
    };
    
    console.log('forecast controller used')
}]);

// LOgin.js
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

// UserInfoCtrl.js
erpagWeather.controller('UserInfoCtrl',[

function UserInfoCtrl($scope, auth) {
  $scope.auth = auth;
         console.log('UserInfoCtrl controller used');
    
}]);