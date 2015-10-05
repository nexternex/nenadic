//ROUTES

erpagWeather.config(function ($routeProvider){

$routeProvider

    .when('/',{
    templateUrl:'Home.htm',
    controller:'homeController'
    })
    .when('/Home',{
    templateUrl:'Home.ejs',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'Forecast.ejs',
    controller:'forecastController'
    })


});