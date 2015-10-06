//ROUTES

erpagWeather.config(function ($routeProvider){

$routeProvider

    .when('/',{
    templateUrl:'views/Home.htm',
    controller:'homeController'
    })
    .when('/Home',{
    templateUrl:'views/Home.ejs',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'views/Forecast.ejs',
    controller:'forecastController'
    })


});