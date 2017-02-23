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
    .when('/mypage',{
    templateUrl:'../pages/mypage.htm',
    controller:'ProfileController',
    requiresLogin: false 
    });
});

