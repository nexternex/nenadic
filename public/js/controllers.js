//CONTROLERS
erpagWeather.controller('homeController',['$scope' ,function($scope){
    
//    $scope.items=itemService;

    
//    angular.element(document).ready(function ($) {
//         console.log('start home controlera'); 
//	//open/close lateral filter
//	$('.cd-filter-trigger').on('click', function(){
//		triggerFilter(true);
//	});
//	$('.cd-filter .cd-close').on('click', function(){
//		triggerFilter(false);
//	});
//
//	function triggerFilter($bool) {
//		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
//		elementsToTrigger.each(function(){
//			$(this).toggleClass('filter-is-visible', $bool);
//		});
//	}
//
//	//mobile version - detect click event on filters tab
//	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
//		filter_tab_placeholder_default_value = 'Select',
//		filter_tab_placeholder_text = filter_tab_placeholder.text();
//	
//	$('.cd-tab-filter li').on('click', function(event){
//		//detect which tab filter item was selected
//		var selected_filter = $(event.target).data('type');
//			
//		//check if user has clicked the placeholder item
//		if( $(event.target).is(filter_tab_placeholder) ) {
//			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
//			$('.cd-tab-filter').toggleClass('is-open');
//
//		//check if user has clicked a filter already selected 
//		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
//			filter_tab_placeholder.text($(event.target).text());
//			$('.cd-tab-filter').removeClass('is-open');	
//
//		} else {
//			//close the dropdown and change placeholder text/data-type value
//			$('.cd-tab-filter').removeClass('is-open');
//			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
//			filter_tab_placeholder_text = $(event.target).text();
//			
//			//add class selected to the selected filter item
//			$('.cd-tab-filter .selected').removeClass('selected');
//			$(event.target).addClass('selected');
//		}
//	});
//	
//	//close filter dropdown inside lateral .cd-filter 
//	$('.cd-filter-block h4').on('click', function(){
//		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
//	})
//
//	//fix lateral filter and gallery on scrolling
//	$(window).on('scroll', function(){
//		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
//	});
//
//	function fixGallery() {
//		var offsetTop = $('.cd-main-content').offset().top,
//			scrollTop = $(window).scrollTop();
//		( scrollTop >= offsetTop ) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
//	}
//
//	/************************************
//		MitItUp filter settings
//		More details: 
//		https://mixitup.kunkalabs.com/
//		or:
//		http://codepen.io/patrickkunka/
//	*************************************/
//
//	buttonFilter.init();
//	$('.cd-gallery ul').mixItUp({
//	    controls: {
//	    	enable: false
//	    },
//	    callbacks: {
//	    	onMixStart: function(){
//	    		$('.cd-fail-message').fadeOut(200);
//	    	},
//	      	onMixFail: function(){
//	      		$('.cd-fail-message').fadeIn(200);
//	    	}
//	    }
//	});
//
//	//search filtering
//	//credits http://codepen.io/edprats/pen/pzAdg
//	var inputText;
//	var $matching = $();
//
//	var delay = (function(){
//		var timer = 0;
//		return function(callback, ms){
//			clearTimeout (timer);
//		    timer = setTimeout(callback, ms);
//		};
//	})();
//
//	$(".cd-filter-content input[type='search']").keyup(function(){
//	  	// Delay function invoked to make sure user stopped typing
//	  	delay(function(){
//	    	inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
//	   		// Check to see if input field is empty
//	    	if ((inputText.length) > 0) {            
//	      		$('.mix').each(function() {
//		        	var $this = $(this);
//		        
//		        	// add item to be filtered out if input text matches items inside the title   
//		        	if($this.attr('class').toLowerCase().match(inputText)) {
//		          		$matching = $matching.add(this);
//		        	} else {
//		          		// removes any previously matched item
//		          		$matching = $matching.not(this);
//		        	}
//	      		});
//	      		$('.cd-gallery ul').mixItUp('filter', $matching);
//	    	} else {
//	      		// resets the filter to show all item if input is empty
//	      		$('.cd-gallery ul').mixItUp('filter', 'all');
//	    	}
//	  	}, 200 );
//	});
//
///*****************************************************
//	MixItUp - Define a single object literal 
//	to contain all filter custom functionality
//*****************************************************/
//var buttonFilter = {
//  	// Declare any variables we will need as properties of the object
//  	$filters: null,
//  	groups: [],
//  	outputArray: [],
//  	outputString: '',
//  
//  	// The "init" method will run on document ready and cache any jQuery objects we will need.
//  	init: function(){
//    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
//    
//    	self.$filters = $('.cd-main-content');
//    	self.$container = $('.cd-gallery ul');
//    
//	    self.$filters.find('.cd-filters').each(function(){
//	      	var $this = $(this);
//	      
//		    self.groups.push({
//		        $inputs: $this.find('.filter'),
//		        active: '',
//		        tracker: false
//		    });
//	    });
//	    
//	    self.bindHandlers();
//  	},
//  
//  	// The "bindHandlers" method will listen for whenever a button is clicked. 
//  	bindHandlers: function(){
//    	var self = this;
//
//    	self.$filters.on('click', 'a', function(e){
//	      	self.parseFilters();
//    	});
//	    self.$filters.on('change', function(){
//	      self.parseFilters();           
//	    });
//  	},
//  
//  	parseFilters: function(){
//	    var self = this;
//	 
//	    // loop through each filter group and grap the active filter from each one.
//	    for(var i = 0, group; group = self.groups[i]; i++){
//	    	group.active = [];
//	    	group.$inputs.each(function(){
//	    		var $this = $(this);
//	    		if($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
//	    			if($this.is(':checked') ) {
//	    				group.active.push($this.attr('data-filter'));
//	    			}
//	    		} else if($this.is('select')){
//	    			group.active.push($this.val());
//	    		} else if( $this.find('.selected').length > 0 ) {
//	    			group.active.push($this.attr('data-filter'));
//	    		}
//	    	});
//	    }
//	    self.concatenate();
//  	},
//  
//  	concatenate: function(){
//    	var self = this;
//    
//    	self.outputString = ''; // Reset output string
//    
//	    for(var i = 0, group; group = self.groups[i]; i++){
//	      	self.outputString += group.active;
//	    }
//    
//	    // If the output string is empty, show all rather than none:    
//	    !self.outputString.length && (self.outputString = 'all'); 
//	
//    	// Send the output string to MixItUp via the 'filter' method:    
//		if(self.$container.mixItUp('isLoaded')){
//	    	self.$container.mixItUp('filter', self.outputString);
//		}
//  	}
//}
//
//    });
   
    console.log('kraj home controlera');
}]);
// LOgin.js
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
//factory return users
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
//ovde nedostaje opis
erpagWeather.controller('tableController',['$scope','todosService','$http', function($scope, todosService,$http) {
$scope.todos=[];    
$scope.query = {
    order: 'text',
    limit: 5,
    page: 1
  };           
  
    
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log('ovo sam dobio iz baze:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });    
    
    
//               
  todosService.getTodos().then(function(data) {
      console.log('paket iz faktorija:'+data);
    $scope.todos = data;
        },function() {
    $scope.error = 'unable to get the todos';
        });
    
//    console.log($scope.todos.every);
////  $scope.getTodos1 = function () {
////    $scope.promise = $http.get('/api/todos', success).$promise;
////  };
////    
    
    $scope.message=true;
    $scope.onChange = function(cbState) {
        $scope.message = cbState;
        };
    
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
erpagWeather.controller('mainController', ['$scope', '$http','$mdDialog', '$mdMedia', function ($scope, $http, $mdDialog, $mdMedia) {
     $scope.formData = {};
     $scope.status = '  ';
     $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

     //when landing on the page, get all todos and show them
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
                console.log('unos eventa'+data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
 $scope.showConfirm = function(id) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Obrisati dogadjaj?')
          .textContent('Brisanjem trajno uklanjeate dogadjaj iz liste')
          .ariaLabel('Lucky day')
          .targetEvent(id)
          .ok('Da, obrisi!')
          .cancel('Otkazi');
    $mdDialog.show(confirm).then(function() {
      $scope.status =  $scope.deleteTodo(id);
    }, function() {
      $scope.status = 'You decided to keep your debt.';
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
    
///Material table parts
    
      $scope.query = {
        order: 'text',
        limit: 5,
        page: 1
      };
//
//  function success(data) {
//    $scope.todos = todos;
//  }
////
  $scope.getTodos = function () {
    $scope.promise = $http.get('/api/todos', success).$promise;
  };
    
    $scope.message=true;
    $scope.onChange = function(cbState) {
        $scope.message = cbState;
        };     
}]);
//Dialog Kontroler za unos novih eventa u listu eventa
erpagWeather.controller('dialogController', ['$scope','$mdDialog', '$mdMedia', function ($scope,$mdDialog, $mdMedia) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  //Dialog za unos novog eventa    
$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'mainController',
      templateUrl: '../pages/dialog1.htm',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };     
}]);    
//Menu controller ----ciricle meni 
erpagWeather.controller('MenuCtrl', function($scope, $mdDialog, $timeout) {
      var self = this;

      self.hidden = false;
      self.isOpen = false;
      self.hover = false;

      // On opening, add a delayed property which shows tooltips after the speed dial has opened
      // so that they have the proper position; if closing, immediately hide the tooltips
      $scope.$watch('demo.isOpen', function(isOpen) {
        if (isOpen) {
          $timeout(function() {
            $scope.tooltipVisible = self.isOpen;
          }, 600);
        } else {
          $scope.tooltipVisible = self.isOpen;
        }
      });

      self.items = [
        { name: "Twitter", icon: "img/icons/twitter.svg", direction: "bottom" },
        { name: "Facebook", icon: "img/icons/facebook.svg", direction: "top" },
        { name: "Google Hangout", icon: "img/icons/hangout.svg", direction: "bottom" }
      ];

      self.openDialog = function($event, item) {
        // Show the dialog
        $mdDialog.show({
          clickOutsideToClose: true,
          controller: function($mdDialog) {
            // Save the clicked item
            this.item = item;

            // Setup some handlers
            this.close = function() {
              $mdDialog.cancel();
            };
            this.submit = function() {
              $mdDialog.hide();
            };
          },
          controllerAs: 'dialog',
          templateUrl: 'dialog.html',
          targetEvent: $event
        });
      }
    });
//Maps controller
erpagWeather.controller('MapsCtrl', ['$scope','GoogleMaps','InitAutocomplete','FillInAddress','Geolocate', function($scope,GoogleMaps,InitAutocomplete,FillInAddress,Geolocate) {
     console.log("maps kontroler entry");
    }]);
//LIST1 kontroler--sluzi da izlista sve ponude
erpagWeather.controller('list1Controller', ['$scope','$http', function ($scope,$http) {
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
//    $http.get('/api/lists')
//        .success(function(data) {
//            $scope.lists = data;
//            console.log('liste sam dobio iz baze:'+data);
//        })
//        .error(function(data) {
//            console.log('Error: ' + data);
//        });
    
    $scope.isLoading = true;

    
    $http.jsonp('https://spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK')
        .success(function(data) {
            $scope.lists = data.feed.entry;
            $scope.isLoading = false;
            console.log('liste sam dobio iz baze:'+data.feed.entry);
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

//conroler za infinite scroll

erpagWeather.controller('InfController', function($scope, Reddit) {
  $scope.reddit = new Reddit();
});

// Reddit constructor function to encapsulate HTTP and pagination logic
erpagWeather.factory('Reddit', function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
      
//    $http.jsonp('https://spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK')
//        .success(function(data) {
//            $scope.lists = data.feed.entry;
//            $scope.isLoading = false;
//            console.log('liste sam dobio iz baze:'+data.feed.entry);
//        })
//        .error(function(data) {
//            console.log('Error: ' + data);
//        });      
     var url = "https://spreadsheets.google.com/feeds/list/11YuCLGXJ_wOb4doQSgcxWuBNZfU9L-oSRo7RqmMNJ4k/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK";
      
//    var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    $http.jsonp(url).success(function(data) {
      var items = data.feed.entry;
      var index=data.feed.openSearch$startIndex;
      for (var i = 0; i < index.$t; i++) {
        this.items.push(items[i].data);
      }
//      this.after = "t3_" + this.index[this.index.$t - 1].id;
      this.busy = false;
    }.bind(this));
  };

  return Reddit;
});

