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
    myDay.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location','$rootScope','HeartService',function ($scope, $http, auth, store, $location,$rootScope,HeartService) {
    // prikaz za ikonice tollbar u zavisnosti da li je user logovoan
    //ikona srce u zavisnosti od switcha 
     $rootScope.filterValues="";
     $rootScope.likes="";

        // function init() {
        //     // $scope.displayElement = HeartService.toggleDisplay();
        // }

        $scope.toggleElement = function() {

            // $scope.displayElement = HeartService.toggleDisplay();

            if( $rootScope.filterValues==""){
                $scope.displayElement=true;
                $scope.heart();
                console.log("filterValues1:"+$rootScope.filterValues+"/de/"+$scope.displayElement);
              }
            else{ 
                $scope.displayElement=false;
                $rootScope.filterValues="";
                console.log("filterValues1a:"+$rootScope.filterValues+"/de/"+$scope.displayElement);
            };
        }
        // init();
    
  
        $scope.heart=function(){
                $http.get('/api/users'+auth.profile.user_id)
                    .success(function(data) {
                        //rezultat 1 profila ide u data
                   $rootScope.filterValues=data[0].ido;
                   console.log("filterValues2:"+$rootScope.filterValues);
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
            // console.log("clicked createUSer!");
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

      
     }]);
//KONTROLER: Maps controller
  myDay.controller('MapsCtrl', ['$scope','GoogleMaps','InitAutocomplete','FillInAddress','Geolocate', function($scope,GoogleMaps,InitAutocomplete,FillInAddress,Geolocate) {
     console.log("maps kontroler entry");
    }]);
//KONTROLER: List controller
    myDay.controller('ListController', ['$scope','$rootScope', '$http','$mdDialog','auth', '$location','$filter','$timeout', function ($scope,$rootScope,$http,$mdDialog,auth, $location,$filter,$timeout) {
            // $scope.kategorija="...tvoj najbolji dan pocinje ovde ;)";
            $scope.search="";
            $scope.selectedItem="";
            $rootScope.filterCities="";
            // $scope.search.gsx$adresa.$t=[];

            $scope.onEnd = function(){
                $timeout(function(){
                    const observer = lozad(); // lazy loads elements with default selector as ".lozad"
                    observer.observe();
                    console.log("lazyload fully aplied");
                }, 1);
            };

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
            $(".cd-tab-filter li").removeClass(".selected");
                if(tema=="menu"){
                    $('#trigger-menu').click();
                }
                else if( tema=="sale") {
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/sale.jpg')";
                    $scope.filters=MyDay_filterSetSale;//pojedinacni opcioni filteri
                    $scope.search.gsx$tip.$t="Sale";//filtriranje grupe
                    $scope.kategorija="Svecane sale i restorani";
                    console.log("sale: "+$scope.filters);
                    $('.overlay_menu-close').click();
                    }
                else if(tema=="cake"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/torte.jpg')";
                    $scope.filters=MyDay_filterSetTorte;
                    $scope.search.gsx$tip.$t="Torte";
                    $scope.kategorija="Torte i sitni kolaci";
                    console.log("torte: "+$scope.filters);
                }
                else if(tema=="music"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/music.jpg')";
                    $scope.filters=MyDay_filterSetMuzika;
                    $scope.search.gsx$tip.$t="Muzika";
                    $scope.kategorija="Muzika, Bendovi, DJ-ovi..";
                    console.log("music: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else if(tema=="foto"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/foto.jpg')";
                    $scope.search.gsx$tip.$t="foto";
                    $scope.search.gsx$tip.$t="foto";
                    $scope.kategorija="Fotografi, Kamermani, Dronovi";
                    console.log("foto: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else if(tema=="zlatare"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/zlatare.jpg')";
                    $scope.search.gsx$tip.$t="zlatare";
                    $scope.kategorija="Zlatare";
                    console.log("zlatare: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else if(tema=="crkve"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/crkve.jpg')";
                    $scope.search.gsx$tip.$t="crkve";
                    console.log("crkve: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else if(tema=="vozila"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/vozila.jpg')";
                    $scope.search.gsx$tip.$t="vozila";
                    $scope.kategorija="Vozila, oldtajemeri, rent-a-car";
                    console.log("vozila: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else if(tema=="putovanja"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/putovanja.jpg')";
                    $scope.search.gsx$tip.$t="putovanja";
                    $scope.kategorija="Bracna putovanja. Egzoticna vencanja";
                    console.log("putovanja: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else if(tema=="animatori"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/animatori.jpg')";
                    $scope.search.gsx$tip.$t="animatori";
                    $scope.kategorija="Animatori, Madjionicari, Striptizete ;)";
                    console.log("animatori: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else if(tema=="dekor"){
                    document.getElementById('MyDay_header').style.backgroundImage = "url('/img/dekor.jpg')";
                    $scope.search.gsx$tip.$t="dekor";
                    $scope.kategorija="Profesionalna dekoracija, Agencije za vencanja";
                    console.log("dekor: "+$scope.filters);
                    $('.overlay_menu-close').click();
                }
                else{
                    console.log("nema parametra:f(temax)")
                    $scope.search.gsx$tip.$t="";
                    $('.overlay_menu-close').click();
                }
                
                document.getElementById('MyDay_header').style.height = "50vh";
            }

            console.log("filterValuesListCtrl:"+$rootScope.filterValues);
    

        //filetri za gradove
            $scope.tags = "";
            $scope.loadCountries = function($query) {
                return $http.get('json/gradovi.json', { cache: true}).then(function(response) {
                var countries = response.data;
                return countries.filter(function(country) {
                    return country.toLowerCase().indexOf($query.toLowerCase()) != -1;
                    });
                });
            };
            $scope.$watch(function() {
                return $scope.tags;
                }, function(newValue, oldValue) {
                console.log("change detected: " + newValue)
                  $rootScope.filterCities=$scope.tags;
                });
        //end filetri za gradove

        //modal detalji kompanije iz liste
        $scope.showAdvanced = function(e,item,auth) {
                $scope.auth=auth;
                    $mdDialog.show({
                        controller: function ($mdDialog,auth) {
                            
                            var vm = this;
                            vm.item = {};
                            vm.item = item;  //your object from the ng-repeat
 
                            $scope.heart1=function(){
                                        $http.get('/api/users'+auth.profile.user_id)
                                            .success(function(data) {
                                                //rezultat 1 profila ide u data
                                                $rootScope.likes=data[0].ido;
                                                console.log("filterValues2:"+$rootScope.filterValues);
                                            })
                                            .error(function(data) {
                                                console.log('Error: ' + data);
                                            });
                                        }; 
                        //execute heart
                            if (auth.isAuthenticated) {
                                $scope.heart1();
                                $("#myd_like").show();
                                $("#myd_unlike").hide();
                            
                            }
                            else {
                                console.log("korisnik  nije logovan");
                            };

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
                        // dijalog ukoliko korisnik nije logovan
                        // full screen sa opcijom da se loguaje ili prijavi 
                               $scope.showPrerenderedDialog = function(event) {
                                    $mdDialog.show({
                                    templateUrl: '../pages/pleaselogin.htm',
                                    clickOutsideToClose:true,
                                    parent: angular.element(document.body),
                                    targetEvent: event,
                                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                                    });
                                };       

                            if (auth.isAuthenticated){

                                $http.post('/api/user_ido'+auth.profile.user_id,{id_c:id_cc})
                                    .success(function(data) {
                                        console.log('Update user completed');
                                    })
                                    .error(function(data) {
                                        console.log('Error: '+ data);
                                    });
                               }
                            else{
                                $scope.showPrerenderedDialog(event); 
                                };                      
                            };



                        this.r_ido = function (id_c) {
                                console.log("rIdo");
                                var id_cc=id_c;

                                $http.post('/api/user_rido'+auth.profile.user_id,{id_c:id_cc})
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
                    })
                    .then( function x(){
                        $timeout(function() {

                            console.log("startujem THEN");
                    
                            var likes = $rootScope.likes;

                            if (likes.indexOf(item.gsx$id.$t) === -1) {
                              console.log("like ne postoji");
                              $("#myd_unlike").hide();
                            }
                            else {
                              $("#myd_like").hide();
                              $("#myd_unlike").show();
                            }
                       }, 30);
                    }()
                    );    
                };
        
                // when landing on the page, GET-liste iz baze podatka 
                //-deo za citanje ako ide iz baze
                
                // $http.get('/api/lists')
                //     .success(function(data) {
                //         $scope.lists = data;
                //         console.log('liste sam dobio iz baze:'+data);
                //     })
                //     .error(function(data) {
                //         console.log('Error: ' + data);
                //     });
        
        $scope.isLoading = true;

        // demo_key="1tIzVyyKxmIyFCjwrXsPh0Jf0n0vWz49HoOtDg0Buv7I"
        // production_key="11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6"

        $http.jsonp('https://spreadsheets.google.com/feeds/list/1tIzVyyKxmIyFCjwrXsPh0Jf0n0vWz49HoOtDg0Buv7I/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK')
            .success(function(data) {
                $scope.lists = data.feed.entry;
                $scope.isLoading = false;
                // window.loading_screen.finish();
        //console.log('liste sam dobio iz baze:'+data.feed.entry);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });  
        }]);

//KONTROLER: Profil korisnika
    myDay.controller('ProfileController', ['$scope','$http','auth','$q','$timeout','$rootScope','$window', function ($scope,$http,auth,$q,$timeout,$rootScope,$window) {

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

    //GoHome
        $scope.goHome = function() {
            try{
            $window.location.href = '/#/';
            }
            catch(e){
                console.log("Error:"+e);
            }  
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
//FACTORY  SET HEART
    myDay.service("HeartService", function(DisplayElement) {
        this.toggleDisplay = function() {
          return DisplayElement.value = !DisplayElement.value;
        }
    })
//Infinite scroll
    myDay.controller('AppCtrl', function ($timeout,$scope,$http) {
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
                     $http.jsonp('https://spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK').then(angular.bind(this, function (obj) {
                          this.items = this.items.concat(obj.data.feed.entry);
                          this.numLoaded_ = this.toLoad_;
                      }));
                  }
              }
          };
       });


