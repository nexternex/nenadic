//ROUTES

myDay.config(function ($routeProvider){

    $routeProvider
        
    .when('/',{
    templateUrl:'../pages/home.htm',
    controller:'ListController',
    requiresLogin: false 
    })
    .when('/Home',{
    templateUrl:'../pages/home.htm',
    controller:'ListController',
    requiresLogin: false 
    })
    .when('/login', {
    templateUrl: '../pages/login.htm',
    controller: 'LoginCtrl', 
    requiresLogin: false       
    })
    .when('/register', {
    templateUrl: '../pages/register.htm',
    controller: 'ProfileController',
    requiresLogin: true   
    })
    .when('/timeline', {
    templateUrl: '../pages/timeline.htm',
    controller: 'ListController',
    requiresLogin: false
    })
    .when('/login2', {
    templateUrl: '../pages/login.htm',
    controller: 'MainController',
    requiresLogin: false
    })
    // Logged in route
    .when('/userInfo', {
    templateUrl: '../pages/userInfo.htm',
    controller: 'MainController',
    requiresLogin: true
    });
    
});

