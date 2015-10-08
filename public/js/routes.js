//ROUTES

erpagWeather.config(function ($routeProvider){

    $routeProvider
        
    .when('/',{
    templateUrl:'../pages/home.htm',
    controller:'homeController'
    })
    
    .when('/Home',{
    templateUrl:'../pages/home.htm',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'../pages/forecast.htm',
    controller:'forecastController',
    requiresLogin: true
    })
    
    .when('/login', {
    templateUrl: '../pages/login.htm',
    controller: 'LoginCtrl'
        
    })
    // Logged in route
    .when('/user-info', {
    templateUrl: '../pages/userInfo.htm',
    controller: 'UserInfoCtrl',
    requiresLogin: true
    });
    
});

