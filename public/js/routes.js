//ROUTES

erpagWeather.config(function ($routeProvider){

$routeProvider

    .when('/',{
    templateUrl:'/views/pages/Home.htm',
    controller:'homeController'
    })
    .when('/Home',{
    templateUrl:'/views/pages/Home',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'/views/pages/Forecast',
    controller:'forecastController'
    })


});