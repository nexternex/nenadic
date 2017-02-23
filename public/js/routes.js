//ROUTES

myDay.config(function ($routeProvider){

    $routeProvider
        
    .when('/',{
    templateUrl:'../pages/home.htm',
    controller:'ListController',
    requiresLogin: false 
    })
    .when('/home',{
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
    .when('/userpage',{
    templateUrl:'../pages/userpage.htm',
    controller:'ListController',
    requiresLogin: false 
    })
    .when('/test',{
    templateUrl:'../pages/test.htm',
    controller:'ListController',
    requiresLogin: false 
    })
    // Logged in route
    .when('/userInfo', {
    templateUrl: '../pages/userInfo.htm',
    controller: 'MainController',
    requiresLogin: false
    });
    
});

