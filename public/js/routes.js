//ROUTES

erpagWeather.config(function ($routeProvider){

$routeProvider

    .when('/',{
    templateUrl:'../../views/pages/Home.htm',
    controller:'homeController'
    })
    .when('/Home',{
    templateUrl:'/pages/Home',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'/pages/Forecast',
    controller:'forecastController'
    })


});