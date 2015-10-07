//ROUTES

erpagWeather.config(function ($routeProvider){

    $routeProvider.when('/',{
    templateUrl:'../pages/home.htm',
    controller:'homeController'
    }
    
    .when('/Home',{
    templateUrl:'../pages/home.htm',
    controller:'homeController'
    })

    .when('/Forecast', {
    templateUrl:'../pages/forecast.htm',
    controller:'forecastController'
    })
    
    .when('/login', {
    templateUrl: 'login.htm',
    controller: 'LoginCtrl'
    })
    // Logged in route
    .when('/user-info', {
    templateUrl: 'userInfo.htm',
    controller: 'UserInfoCtrl',
    requiresLogin: true
    });
    
    authProvider.init({
    domain: 'myday.eu.auth0.com',
    clientID: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl',
    callbackURL: location.href,
    // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
    loginUrl: '/login'
    });
    
});

