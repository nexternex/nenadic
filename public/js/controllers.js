//KONTROLER: Home controller
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
//KONTROLER: Login controller
    myDay.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location','$rootScope',function ($scope, $http, auth, store, $location,$rootScope) {
    // prikaz za ikonice tollbar u zavisnosti da li je user logovoan
        //ikona srce u zavisnosti od switcha 
        $scope.heartClicked=$rootScope.heart;

        $scope.heart=function(){
                $http.get('/api/users'+auth.profile.user_id)
                    .success(function(data) {
                        //rezultat 1 profila ide u data
                    $rootScope.up=data[0].ido;
                    $rootScope.heart=!$rootScope.heart;
                    console.log( $rootScope.heart);
                        //setujem formData da je jednak prvom objektu iz niza
                    console.log('srce povlaci likove:'+$rootScope.up);

                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                };



       $scope.mystate=function (){
           var state=[];
           if(auth.profile == undefined){
             state=false;   
           }
           else{
               state=true;
           }
           return state;
       };

       console.log("funcija:"+auth.profile +": "+$scope.mystate());

    //Api create a new account
        $scope.createUser = function() {
            console.log("clicked createUSer!");
            $http.post('/api/create_user'+auth.profile.user_id)
                .success(function(data) {
                    // $scope.formUser = data;
                    alert("uspesno ste registrovali nalog koristeci profileController");
                   
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                 }); 
        };

    $scope.auth = auth;

    $scope.login = function () {
        //podesavanje opcija za auth Lock widget//
        var options1={
            icon: 'https://nenadic.herokuapp.com/img/myday.png',
            primaryColor: 'purple',
            language:'en'
             };
       
        auth.signin(options1, function (profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/home');
         
         
        }, function () {
            console.log('error controller login');
            alert("please login");
        // Error callback
        });
    };

    $scope.signup=function(){
        //podesavanje opcija za auth Lock widget//
        auth.signup({
            icon: 'https://nenadic.herokuapp.com/img/myday.png',
            primaryColor: '#82FFA9',
        }, function (profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/userpage');
        $scope.createUser();
        }, function () {
            console.log('error controller login');
            alert("please login");
        // Error callback
        });
    };
        
    $scope.logout = function() {
        // $rootScope.up ="";
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/home');
    };

    console.log('pokusaj login controller used');

    }]);
//KONTROLER: Logout controller
    myDay.controller('LogoutCtrl', function (auth, $location, store) {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/timeline');
    });
//KONTROLER: UserInfoCtrl controller
    myDay.controller('UserInfoCtrl',['$scope','auth', function ($scope, auth) {
    $scope.auth = auth;
    console.log('UserInfoCtrl controller used');  
    }]);
//KONTROLER: Main coontroler
  myDay.controller('MainController', ['$scope', '$http','$mdDialog', '$mdMedia','auth', function ($scope, $http, $mdDialog, $mdMedia, auth) {
        var todoData={};
        $scope.auth = auth;
        $scope.formData = {};
        $scope.status = '  ';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.todos='';
        $scope.photo='';
        $scope.customFullscreen = false;
        //  $scope.photo.user_id=auth.profile.user_id;

   //When landing on the page, get all todos and show them    
       $http.get('/api/todos'+auth.profile.user_id)
        .success(function(data) {
            $scope.todos = data;
            console.log('filter data by id:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
   //Api create a todo
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
    
    //Delete a todo after checking it
    $scope.deleteTodo = function(id) { 
            $http.delete('/api/todos/' + id)
                .success(function(data) {
                    $scope.todos = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };  
    //dijalog koji podize modal za kreiranje  todo
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
//KONTROLER: Menu controller----ciricle meni 
    myDay.controller('MenuCtrl',['$scope', function($scope) {
            console.log("MenuCtrl");
        // filteri za sale
            var MyDay_filterSetSale=[  
                ["sectionCap",[100,200,300]],
                ["sectionTip",["moderan","rustican","kafana","restoran","hotel","motel"]],
                ["sectionCena",[12,14,15,16,17,18,19,20]],
                ["sectionFeat",["bazen","terasa","otvoren"]]
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

        $scope.filters=MyDay_filterSetTorte;

        console.log($scope.filters);


        $scope.changeSet=function(tema){
 
                if( tema=="sale") {
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/001.jpg')";
                    $scope.filters=MyDay_filterSetSale;
                    console.log("sale: "+$scope.filters);
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
              
                }
                else{
                    console.log("nema parametra:f(temax)")
                }

            }
     }]);
//KONTROLER: Maps controller
  myDay.controller('MapsCtrl', ['$scope','GoogleMaps','InitAutocomplete','FillInAddress','Geolocate', function($scope,GoogleMaps,InitAutocomplete,FillInAddress,Geolocate) {
     console.log("maps kontroler entry");
    }]);
//KONTROLER: List controller--dropdown komponente
    myDay.controller('ListController', ['$scope','$rootScope', '$http','$mdDialog','auth', '$location', function ($scope,$rootScope,$http,$mdDialog,auth, $location) {
        if ($rootScope.up ==""){
              $scope.filterValues ="";
        }
        else if($rootScope.up !==""){
            $scope.filterValues = $rootScope.up;
        };

   
        //modal detalji kompanije iz liste
        $scope.showAdvanced = function(e,item,auth) {
                $scope.auth=auth;
                    $mdDialog.show({
                        controller: function ($mdDialog,auth) {
                            var vm = this;
                            vm.item = {};
                            vm.item = item;  //your task object from the ng-repeat

                        this.hide = function () {
                                console.log("hide");
                                $mdDialog.hide();
                            };
                            
                        this.cancel = function () {
                                console.log("cancel");
                                $mdDialog.cancel();
                            };

                        this.ido = function (id_c) {
                                console.log("Ido");
                                var id_cc=id_c;

                                $http.post('/api/user_ido'+auth.profile.user_id,{id_c:id_cc})
                                    .success(function(data) {
                                        console.log('Update user completed');
                                    })
                                    .error(function(data) {
                                        console.log('Error: '+ data);
                                    });
                                                    
                            };
                        },
                        controllerAs: 'modal',
                        templateUrl: '../pages/companyCard.htm',
                        clickOutsideToClose:true,
                        parent: angular.element(document.body),
                        targetEvent: e,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    }).then(console.log(item));
                };
        
                // when landing on the page, GET-liste iz baze podatka
                // $http.get('/api/lists')
                //     .success(function(data) {
                //         $scope.lists = data;
                //         console.log('liste sam dobio iz baze:'+data);
                //     })
                //     .error(function(data) {
                //         console.log('Error: ' + data);
                //     });
        
            $scope.isLoading = true;

        
        $http.jsonp('https://spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK')
            .success(function(data) {
                $scope.lists = data.feed.entry;
                $scope.isLoading = false;
        //console.log('liste sam dobio iz baze:'+data.feed.entry);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });  
        }]);
//KONTROLER: Profil korisnika
    myDay.controller('ProfileController', ['$scope','$http','auth','$q','$timeout','$rootScope', function ($scope,$http,auth,$q,$timeout,$rootScope) {

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


    //UPDATE User
    $scope.updateUser = function() {
       console.log("UPDATE USER Start");
       $http.post('/api/user_update'+auth.profile.user_id,{formUser: $scope.formUser,name:$scope.name,lastname:$scope.lastname,email:$scope.email,u_id:auth.profile.user_id})
        .success(function(data) {
            console.log('Update user completed');
        })
        .error(function(data) {
            console.log('Error: '+ data);
        });
    };    

        
  // LOAD PROFILE when landing on the page, get profile and show them
    $http.get('/api/users'+auth.profile.user_id)
        .success(function(data) {
            //rezultat 1 profila ide u data
            $scope.formUser = data[0];
            //setujem formData da je jednak prvom objektu iz niza
            console.log('profil sam dobio iz baze:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });    

  // ++when submitting the add form, send the text to the node API
    $scope.createList = function() {
        $http.post('/api/lists', {formData: $scope.formData,size:$scope.size,category:$scope.category})
            .success(function(data) {
                $scope.formData = data;
                alert("uspesno ste registrovali nalog koristeci profileController");
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
//FACTORY: ??? 
 myDay.factory('todosService', function($http) {
  var getTodos = function() {
    return $http.get('/api/todos');
  };

  return {
    getTodos: getTodos
  };
 });
//KONTROLER: Infinite scroll - virtual scroll
  myDay.controller('virtualCtrl', function($timeout,$http,$scope) {
          // In this example, we set up our model using a plain object.
          // Using a class works too. All that matters is that we implement
          // getItemAtIndex and getLength.
          var vm = this;
          vm.infiniteItems = {
              numLoaded_: 0,
              toLoad_: 0,
              items: [],

              // Required.
              getItemAtIndex: function (index) {
                  if (index > this.numLoaded_) {
                      this.fetchMoreItems_(index);
                      return null;
                  }
                  return this.items[index];
              },

              // Required.
              getLength: function () {
                  return this.numLoaded_ + 5;
              },

              fetchMoreItems_: function (index) {
                  if (this.toLoad_ < index) {
                      this.toLoad_ += 5;

                    $scope.list=$http.jsonp('https://spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK')
                        .success(function(data) {
                            console.log('liste sam dobio iz baze:'+data.feed.entry);
                            return data.feed.entry
          
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        }).then(angular.bind(this, function (obj) {
                          this.items = this.items.concat(obj.data);
                          this.numLoaded_ = this.toLoad_;
                      }));
                  }
              }
          }
      });
