//CONTROLERS
erpagWeather.controller('homeController',['$scope','cityService' ,function($scope,cityService){

    $scope.city=cityService.city;
    $scope.$watch('city', function(){
        cityService.city=$scope.city
    });

}]);

erpagWeather.controller('forecastController',['$scope','$resource','cityService' ,function($scope,$resource,cityService){

    $scope.city=cityService.city;
    
    $scope.weatherAPI=$resource("http://openweathermap.org/data/2.5/forecast/daily", {
        callback:"JSON_CALLBACK"},{get:{method:"JSONP"}
    });

    $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt:2});

    $scope.convertToDeg=function(degK){
        return Math.round(degK-273);
    };
    
    $scope.convertToDate=function(dt){
        return new Date(dt*1000);
    };
    
    console.log('forecast controller used')
}]);

// LOgin.js
erpagWeather.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',function ($scope, $http, auth, store, $location) {
    
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function () {
        console.log('error controller login');
      // Error callback
    });
  };
    
  $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
  };

  console.log('pokusaj login controller used');

}]);
// Logout controller
erpagWeather.controller('LogoutCtrl', function (auth, $location, store) {
  auth.signout();
  store.remove('profile');
  store.remove('token');
  $location.path('/login');
});
// UserInfoCtrl.js
erpagWeather.controller('UserInfoCtrl',['$scope','auth', function ($scope, auth) {
  $scope.auth = auth;
  console.log('UserInfoCtrl controller used');  
}]);


//MAIN coontroler

erpagWeather.controller('mainController', ['$scope', '$http','API', function ($scope, $http,API) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log('ovo sam dobio iz baze:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]);


erpagWeather.controller('list1Controller', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};
    
    $scope.category={
    singleSelect: null,
    availableOptions: [
      {id: '1', name: 'Svecane sale'},
      {id: '2', name: 'Bend za svadbe'},
      {id: '3', name: 'Dekoracija'},
      {id: '4', name: 'Poslasticarnica'},
      {id: '5', name: 'Efekti'}
    ],
   };
    
    $scope.size={
    singleSelect: null,
    availableOptions: [
      {id: '1', name: 'Standardna'},
      {id: '2', name: 'Velika'},
    ],
   };

    // when landing on the page, get all lists and show them
    $http.get('/api/lists')
        .success(function(data) {
            $scope.lists = data;
            console.log('liste sam dobio iz baze:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createList = function() {
        $http.post('/api/lists', {formData: $scope.formData,size:$scope.size,category:$scope.category})
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.lists = data;
                console.log(data);
                alert("uspesno ste registrovali nalog koristeci list1");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a list after checking it
    $scope.deleteList = function(id) {
        $http.delete('/api/lists/' + id)
            .success(function(data) {
                $scope.lists = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    
    ///file upload controler///
//    $scope.uploadLogo = function(logoFile) {
//    console.log('before_API');
//      API.uploadLogo(logoFile).success(function (uploadResponse) {
//          // Handle response from server
//        console.log(uploadResponse);
//      }).error(function (error) {
//        // Handle error from server
//        console.log(error);
//      });
//    };
    

}]);

//end of MAIN controller