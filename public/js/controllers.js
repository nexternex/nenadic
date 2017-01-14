//CONTROLERS
erpagWeather.controller('homeController',['$scope' ,function($scope){
    console.log('kraj home controlera');
}]);
// Login.js
erpagWeather.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',function ($scope, $http, auth, store, $location) {
    
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/register');
    }, function () {
        console.log('error controller login');
        alert("please login");
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
//Logout controller
erpagWeather.controller('LogoutCtrl', function (auth, $location, store) {
  auth.signout();
  store.remove('profile');
  store.remove('token');
  $location.path('/timeline');
});
//UserInfoCtrl.js
erpagWeather.controller('UserInfoCtrl',['$scope','auth', function ($scope, auth) {
  $scope.auth = auth;
  console.log('UserInfoCtrl controller used');  
}]);
//MAIN coontroler
erpagWeather.controller('mainController', ['$scope', '$http','$mdDialog', '$mdMedia','auth', function ($scope, $http, $mdDialog, $mdMedia, auth) {
     var todoData={};
     $scope.auth = auth;
     $scope.formData = {};
     $scope.status = '  ';
     $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
     $scope.todos='';
     $scope.photo='';
    //  $scope.photo.user_id=auth.profile.user_id;
    
// When landing on the page, get all todos and show them    
       $http.get('/api/todos'+auth.profile.user_id)
        .success(function(data) {
            $scope.todos = data;
            console.log('filter data by id:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
// API CREATE
    $scope.createTodo = function() {
        $http.post('/api/todos',$scope.formData)
            .success(function(data) {
                  $scope.todos = data;
                  $scope.formData = {}; // clear the form so our user is ready to enter another
                  $mdDialog.hide();
                  
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
// Delete a todo after checking it



    $scope.deleteTodo = function(id) { 
            $http.delete('/api/todos/' + id)
                .success(function(data) {
                    $scope.todos = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };  
    //    dijalog koji podize modal za kreiranje  todo
    $scope.showCreate = function() {     
        $mdDialog.show({ 
                controller: 'mainController',
                templateUrl: '../pages/dialog1.htm',
                clickOutsideToClose:true
        }).then(function() {
            $http.get('/api/todos'+auth.profile.user_id)
            .success(function(data) {
                $scope.todos = data;
                console.log('filter data by id:'+data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }, function() {
        $scope.status = 'You decided to keep your debt.';
        });
    }; 
        
    // dijalog koji potvrdjuje brisanje
    $scope.showConfirm = function(id) {
        var confirm = $mdDialog.confirm()
            .title('Obrisati dogadjaj?')
            .textContent('Brisanjem trajno uklanjeate dogadjaj iz liste')
            .targetEvent(id)
            .ok('Obrisi')
            .cancel('Otkazi');
            
        $mdDialog.show(confirm).then(function() {
        $scope.status =  $scope.deleteTodo(id);
        }, function() {
        $scope.status = 'You decided to keep your debt.';
        });
    };  
// Basic md-dialog contollers
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
     
// Switch za readonly detalje naloga//
    
    $scope.message=true;
    $scope.onChange=true;
    $scope.onChange = function(cbState) {
        $scope.message = cbState;
        };     
// UPDATE IMAGE URL
 $scope.updateImageUrl = function() {
       $http.post('/api/save-details/'+ auth.profile.user_id)
        .success(function(data) {
            console.log('Update image url:');
        })
        .error(function(data) {
            console.log('Error: ');
        });
    };
}]);  
//Menu controller ----ciricle meni 
erpagWeather.controller('MenuCtrl', function() {
      this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];
      this.isOpen = false;
      this.availableModes = ['md-fling', 'md-scale'];
      this.selectedMode = 'md-fling';
      this.availableDirections = ['up', 'down', 'left', 'right'];
      this.selectedDirection = 'up';
    });
//Maps controller
erpagWeather.controller('MapsCtrl', ['$scope','GoogleMaps','InitAutocomplete','FillInAddress','Geolocate', function($scope,GoogleMaps,InitAutocomplete,FillInAddress,Geolocate) {
     console.log("maps kontroler entry");
    }]);
//LIST1 kontroler--dropdown komponente
erpagWeather.controller('list1Controller', ['$scope','$http', function ($scope,$http) {

// when landing on the page, get all lists and show them
    $http.get('/api/lists')
        .success(function(data) {
            $scope.lists = data;
            console.log('liste sam dobio iz baze:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.isLoading = true;

    
    $http.jsonp('https://spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK')
        .success(function(data) {
            $scope.lists = data.feed.entry;
            $scope.isLoading = false;
//            console.log('liste sam dobio iz baze:'+data.feed.entry);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });    
    
        // In this example, we set up our model using a plain object.
        // Using a class works too. All that matters is that we implement
        // getItemAtIndex and getLength.
        this.infiniteItems = {
          numLoaded_: 0,
          toLoad_: 0,

          // Required.
          getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
              this.fetchMoreItems_(index);
              return null;
            }

            return index;
          },

          // Required.
          // For infinite scroll behavior, we always return a slightly higher
          // number than the previously loaded items.
          getLength: function() {
            return this.numLoaded_ + 5;
          },

          fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            if (this.toLoad_ < index) {
              this.toLoad_ += 20;
              $timeout(angular.noop, 300).then(angular.bind(this, function() {
                this.numLoaded_ = this.toLoad_;
              }));
            }
          }
        };
}]);

//PROFIL KORISNIKA//
erpagWeather.controller('profileController', ['$scope','$http','auth','$q','$timeout', function ($scope,$http,auth,$q,$timeout) {
    $scope.formData = {};
    $scope.profiles = [];
    $scope.auth = auth;
    
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
        
//UPLOAD image
$scope.onFileSelect = function(image) {
  $scope.uploadInProgress = true;
  $scope.uploadProgress = 0;

  if (angular.isArray(image)) {
    image = image[0];
  }

  $scope.upload = $upload.upload({
    url: '/api/v1/upload/image',
    method: 'POST',
    data: {
      type: 'profile'
    },
    file: image
  }).progress(function(event) {
    $scope.uploadProgress = Math.floor(event.loaded / event.total);
    $scope.$apply();
  }).success(function(data, status, headers, config) {
    AlertService.success('Photo uploaded!');
  }).error(function(err) {
    $scope.uploadInProgress = false;
    AlertService.error('Error uploading file: ' + err.message || err);
  });
};

// when landing on the page, get profile and show them
    $http.get('/api/profile'+auth.profile.user_id)
        .success(function(data) {
            $scope.profiles = data;
            $scope.formData=$scope.profiles[0];
        
            console.log('profil sam dobio iz baze:'+$scope.my_profile);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });    

// when submitting the add form, send the text to the node API
    $scope.createList = function() {
        $http.post('/api/lists', {formData: $scope.formData,size:$scope.size,category:$scope.category})
            .success(function(data) {
//                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.formData = data;
//                console.log(data);
                alert("uspesno ste registrovali nalog koristeci profileController linux");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a list after checking it
    $scope.deleteList = function(id) {
        $http.delete('/api/lists/' + id)
            .success(function(data) {
                $scope.formData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };    
    
}]);
//FACTORY return users
erpagWeather.factory('setEvent', function($http) {
  return {
    loadEvents: function(data) {
    $http.get('/api/todos')
        .success(function(data) {
             console.log('1001:return events from database'+data);
             return data;
            })
        .error(function(data) {
            console.log('101:error retur events from database');
            });
        return data;
    }
  }; 
});
//ovde nedostaje opis
erpagWeather.factory('todosService', function($http) {
  var getTodos = function() {
    return $http.get('/api/todos');
  };

  return {
    getTodos: getTodos
  };
});

