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
    
    .when('/list', {
    templateUrl: '../pages/list.htm',
    controller: 'list1Controller'        
    })
     .when('/comp', {
    templateUrl: '../pages/companies.htm',
    controller: 'list1Controller'        
    })
    .when('/hero', {
    templateUrl: '../pages/hero.htm',
    controller: 'list1Controller'        
    })
    .when('/register', {
    templateUrl: '../pages/register.htm',
    controller: 'list1Controller'
        
    })
    .when('/timeline', {
    templateUrl: '../pages/timeline.htm',
    controller: 'list1Controller'
        
    })
    // Logged in route
    .when('/userInfo', {
    templateUrl: '../pages/userInfo.htm',
    controller: 'mainController',
    requiresLogin: true
    });
    
});

