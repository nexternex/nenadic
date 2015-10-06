//ROUTES

erpagWeather.config(function ($routeProvider){

$routeProvider

    .when('/',{
    templateUrl:'../pages/Home.htm',
    controller:'homeController'
    })
    .when('/Home',{
    templateUrl:'../pages/home.htm',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'../pages/forecast.htm',
    controller:'forecastController'
    })


});