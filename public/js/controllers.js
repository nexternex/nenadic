//CONTROLERS
//erpagWeather.controller('IndexCtrl',['$scope','$http',function ($scope, $http) {
//  $http.get('/api/posts').
//    success(function(data, status, headers, config) {
//      $scope.posts = data.posts;
//    });
//}]);


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
}]);