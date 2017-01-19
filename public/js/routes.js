//ROUTES

erpagWeather.config(function ($routeProvider){

    $routeProvider
        
    .when('/',{
    templateUrl:'../pages/home.htm',
    controller:'ListController'
    })
    .when('/Home',{
    templateUrl:'../pages/home.htm',
    controller:'ListController',
    })
    .when('/login', {
    templateUrl: '../pages/login.htm',
    controller: 'LoginCtrl'       
    })
    .when('/list', {
    templateUrl: '../pages/list.htm',
    controller: 'ListController'        
    })
    .when('/register', {
    templateUrl: '../pages/register.htm',
    controller: 'ProfileController',
    requiresLogin: true   
    })
    .when('/mypage', {
    templateUrl: '../pages/mypage.htm',
    controller: 'ListController',
    requiresLogin: false  
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

