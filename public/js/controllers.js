//CONTROLERS
myDay.controller('HomeController',['$scope' ,function($scope){
     
      $scope.fab = {
        isOpen: false,
        count: 0,
        selectedDirection: 'right',
        showTooltip : false,
        tipDirection : 'down'
      };

      $scope.slides=[{name:'1/3', txt:'neki text', src:'/img/001.jpg'},
                     {name:'2/3', txt:'tekst do bola', src:'/img/001.jpg'},
                     {name:'3/3', txt:'Best a name', src:'/img/002.jpg'}];

}]);
// Login.js
myDay.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',function ($scope, $http, auth, store, $location) {
$scope.auth = auth;
  $scope.login = function () {
// podesavanje opcija za auth Lock widget
    auth.signin({
        icon: 'https://nenadic.herokuapp.com/img/myday.png',
        primaryColor: 'purple',
        language:'es',
        languageDictionary: {
            emailInputPlaceholder: "something@youremail.com",
            title: "Uloguj me"
            }
    }, function (profile, token) {
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
      $location.path('/home');
  };

  console.log('pokusaj login controller used');

}]);
//Logout controller
myDay.controller('LogoutCtrl', function (auth, $location, store) {
  auth.signout();
  store.remove('profile');
  store.remove('token');
  $location.path('/timeline');
});
//UserInfoCtrl.js
myDay.controller('UserInfoCtrl',['$scope','auth', function ($scope, auth) {
  $scope.auth = auth;
  console.log('UserInfoCtrl controller used');  
}]);
//MAIN coontroler
myDay.controller('MainController', ['$scope', '$http','$mdDialog', '$mdMedia','auth', function ($scope, $http, $mdDialog, $mdMedia, auth) {
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
// Api create a todo
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
                controller: 'MainController',
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



// <-----------Main controler END------------------------>    
}]);   
//Menu controller ----ciricle meni 
myDay.controller('MenuCtrl',['$scope', function($scope) {
            
            console.log("MenuCtrl");

            this.topDirections = ['left', 'up'];
            this.bottomDirections = ['down', 'right'];
            this.isOpen = false;
            this.availableModes = ['md-fling', 'md-scale'];
            this.selectedMode = 'md-fling';
            this.availableDirections = ['up', 'down', 'left', 'right'];
            this.selectedDirection = 'up';

            $scope.filters=MyDay_filterSetSale;

        // filteri za sale
            var MyDay_filterSetSale=[  
                ["Kapacitet",[100,200,300]],
                ["Tip",["moderan","rustican","kafana","restoran","hotel","motel"]],
                ["Prosecne cene",[12,14,15,16,17,18,19,20]],
                ["Dodatni elementi",["bazen","terasa","otvoren"]]
            ];
        // filteri za muziku
            var MyDay_filterSetMuzika=[ 
                ["Clanova Benda",[2,4,6]],
                ["Vrsta Benda",["moderan","rockpop","tamburaski","starogradski"]],
                ["Cena",[120,140,150,160,170,1800,1900,2000]],
                ["Efekti",["koreografija","ozvucenje","svetla"]]
            ];
        // filteri za torte
            var MyDay_filterSetTorte=[ 
                ["Velicina",[2,4,6]],
                ["Tezina",["1","5","10","15","20","30"]],
                ["Efekti",["Muzicka","Pirotehnika","3d"]]
             ];

        $scope.changeSet=function(tema){

                if( tema=="sale") {
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/001.jpg')";
                    this.filters=MyDay_filterSetSale;
                    console.log("sale: "+this.filters);
                    }
                else if(tema=="cake"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/002.jpg')";
                     $scope.filters=MyDay_filterSetTorte;
                     console.log("torte: "+$scope.filters);
                }
                else if(tema=="music"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/003.jpg')";
                    $scope.filters=MyDay_filterSetMuzika;
                    console.log("music: "+$scope.filters);
                }
                else if(tema=="foto"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/004.jpg')";
                    alert(tema);
                }
                else{
                    console.log("nema parametra:f(temax)")
                }

            }
     }]);

    

//Maps controller
myDay.controller('MapsCtrl', ['$scope','GoogleMaps','InitAutocomplete','FillInAddress','Geolocate', function($scope,GoogleMaps,InitAutocomplete,FillInAddress,Geolocate) {
     console.log("maps kontroler entry");
    }]);
//LIST kontroler--dropdown komponente
myDay.controller('ListController', ['$scope','$http', function ($scope,$http) {
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
myDay.controller('ProfileController', ['$scope','$http','auth','$q','$timeout', function ($scope,$http,auth,$q,$timeout) {
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
        
// LOAD PROFILE when landing on the page, get profile and show them
    $http.get('/api/profile'+auth.profile.user_id)
        .success(function(data) {
            //rezultat 1 profila ide u data
            $scope.profiles = data;
            //setujem formData da je jednak prvom objektu iz niza
            $scope.formData=$scope.profiles[0];
            console.log('profil sam dobio iz baze:'+$scope.my_profile);
        })
        .error(function(data) {
            console.log('Error: ' + data);
            // $scope.profiles = data;
            // $scope.formData=$scope.profiles[0];
        });    

// ++when submitting the add form, send the text to the node API
    $scope.createList = function() {
        $http.post('/api/lists', {formData: $scope.formData,size:$scope.size,category:$scope.category})
            .success(function(data) {
                $scope.formData = data;
                alert("uspesno ste registrovali nalog koristeci profileController linux");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

// DELETE a list after checking it
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
// UPDATE LIST
    $scope.updateList = function() {
       console.log("UPDATE LIST Start");
       $http.post('/api/lists_update/',{formData: $scope.formData,name:$scope.name,size:$scope.size,category:$scope.category,user_id:auth.profile.user_id})
        .success(function(data) {
            console.log('Update List completed');
        })
        .error(function(data) {
            console.log('Error: '+ data);
        });
    }; 
// UPDATE image url
 $scope.updateImageUrl = function() {
       $http.post('/api/save-details/'+ auth.profile.user_id)
        .success(function(data) {
            console.log('Update image url');
        })
        .error(function(data) {
            console.log('Error update_list_f: '+ data);
        });
    };   
           
//<------------------------END PROFILE CONTROLER------------------->    
}]);
//FACTORY return users
myDay.factory('setEvent', function($http) {
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
myDay.factory('todosService', function($http) {
  var getTodos = function() {
    return $http.get('/api/todos');
  };

  return {
    getTodos: getTodos
  };
});

