//ROUTES

erpagWeather.config(function ($routeProvider){

$routeProvider

    .when('/',{
    templateUrl:'/pages/Home.ejs',
    controller:'homeController'
    })
    .when('/Home',{
    templateUrl:'/pages/Home.ejs',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'pages/Forecast.ejs',
    controller:'forecastController'
    })


});