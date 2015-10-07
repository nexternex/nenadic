//ROUTES

erpagWeather.config(function ($routeProvider){

    $routeProvider.when('/',{
    templateUrl:'../pages/home.htm',
    controller:'homeController'
    })
    $routeProvider.when('/Home',{
    templateUrl:'../pages/home.htm',
    controller:'homeController'
    })

    $routeProvider.when('/Forecast', {
    templateUrl:'../pages/forecast.htm',
    controller:'forecastController'
    });
    
    $routeProvider.when('/login', {
    templateUrl: 'login.tpl.html',
    controller: 'LoginCtrl'
    });
    // Logged in route
    $routeProvider.when('/user-info', {
    templateUrl: 'userInfo.tpl.html',
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

