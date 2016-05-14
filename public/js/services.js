'use strict';
 
angular.module('angularRestfulAuth')
    .factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "your_service_url";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }
 
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
 
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
 
        var currentUser = getUserFromToken();
 
        return {
            save: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }
]);

$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]); 

//factory koji vraca sve evente
//erpagWeather.factory('setEvent',function($http) {
//   return {
//        getAll:function(){ 
//         $.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json", function(data) {
//          //first row "title" column
//            
//          console.log(data.feed.entry[0]['gsx$title']['$t']);
//            });
//            return data;      
//        },
//        getName:function(){ 
//            var nex='nenad nenadic';
//            return nex;}
//
//    };
//});
 
erpagWeather.factory('nex', function(){
    return {
        say1: function(text){
            return "Factory says \"Hello " + text + "\"";
        },
        say2: function(text){
            return "Factory says \"Goodbye " + text + "\"";
        }  
    }               
});
