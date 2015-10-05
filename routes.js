//ROUTES

erpagWeather.config(function ($routeProvider){

$routeProvider

    .when('/',{
    templateUrl:'TEMPLATES/Home.htm',
    controller:'homeController'
    })
    .when('/Home',{
    templateUrl:'TEMPLATES/Home.htm',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'TEMPLATES/Forecast.htm',
    controller:'forecastController'
    })


});