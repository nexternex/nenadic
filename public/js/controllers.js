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

//DROP DOWN COMBO
erpagWeather.controller('dropDown', ['$scope', function($scope) {
   $scope.data = {
    singleSelect: null,
    availableOptions: [
      {id: '1', name: 'Svecane sale'},
      {id: '2', name: 'Bend za svadbe'},
      {id: '3', name: 'Dekoracija'},
      {id: '4', name: 'Poslasticarnica'},
      {id: '5', name: 'Efekti'}
    ],
   };
}]);


//MAIN coontroler

erpagWeather.controller('mainController', ['$scope', '$http', function ($scope, $http) {
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

//list Controler
erpagWeather.controller('listController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/lists')
        .success(function(data) {
            $scope.todos = data;
            console.log('ovo sam dobio iz baze:'+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/lists', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.lists = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/lists/' + id)
            .success(function(data) {
                $scope.lists = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]);


erpagWeather.controller('dropDown', ['$scope', function($scope) {
   $scope.data = {
    singleSelect: null,
    availableOptions: [
      {id: '1', name: 'Svecane sale'},
      {id: '2', name: 'Bend za svadbe'},
      {id: '3', name: 'Dekoracija'},
      {id: '4', name: 'Poslasticarnica'},
      {id: '5', name: 'Efekti'}
    ],
   };
}]);


erpagWeather.controller('main1Controller', function ($scope, $http) {
    $scope.formData = {};
    // when landing on the page, get all todos and show them
    $http.get('/api/lists')
        .success(function(data) {
            $scope.users = data;
            console.log(data);
          
            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    //you also get the actual event object
                    //do stuff, execute functions -- whatever...
                    console.log('sad funcija');


    (function(window) {

    'use strict';

    var support = { animations : Modernizr.cssanimations },
        animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
        onEndAnimation = function( el, callback ) {
            var onEndCallbackFn = function( ev ) {
                if( support.animations ) {
                    if( ev.target != this ) return;
                    this.removeEventListener( animEndEventName, onEndCallbackFn );
                }
                if( callback && typeof callback === 'function' ) { callback.call(); }
            };
            if( support.animations ) {
                el.addEventListener( animEndEventName, onEndCallbackFn );
            }
            else {
                onEndCallbackFn();
            }
        };

    // from http://www.sberry.me/articles/javascript-event-throttling-debouncing
    function throttle(fn, delay) {
        var allowSample = true;

        return function(e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function() { allowSample = true; }, delay);
                fn(e);
            }
        };
    }

    // sliders - flickity
    var sliders = [].slice.call(document.querySelectorAll('.slider')),
        // array where the flickity instances are going to be stored
        flkties = [],
        // grid element
        grid = document.querySelector('.grid'),
        // isotope instance
        iso,
        // filter ctrls
        filterCtrls = [].slice.call(document.querySelectorAll('.filter > button')),
        // cart
        cart = document.querySelector('.cart'),
        cartItems = cart.querySelector('.cart__count');

    function init() {
        // preload images
        imagesLoaded(grid, function() {
            initFlickity();
            initIsotope();
            initEvents();
            classie.remove(grid, 'grid--loading');
        });
    }

    function initFlickity() {
        sliders.forEach(function(slider){
            var flkty = new Flickity(slider, {
                prevNextButtons: false,
                wrapAround: true,
                cellAlign: 'left',
                contain: true,
                resize: false
            });

            // store flickity instances
            flkties.push(flkty);
        });
    }

    function initIsotope() {
        iso = new Isotope( grid, {
            isResizeBound: false,
            itemSelector: '.grid__item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid__sizer'
            },
            transitionDuration: '0.6s'
        });
    }

    function initEvents() {
        filterCtrls.forEach(function(filterCtrl) {
            filterCtrl.addEventListener('click', function() {
                classie.remove(filterCtrl.parentNode.querySelector('.filter__item--selected'), 'filter__item--selected');
                classie.add(filterCtrl, 'filter__item--selected');
                iso.arrange({
                    filter: filterCtrl.getAttribute('data-filter')
                });
                recalcFlickities();
                iso.layout();
            });
        });

        // window resize / recalculate sizes for both flickity and isotope/masonry layouts
        window.addEventListener('resize', throttle(function(ev) {
            recalcFlickities()
            iso.layout();
        }, 50));

        // add to cart
        [].slice.call(grid.querySelectorAll('.grid__item')).forEach(function(item) {
            item.querySelector('.action--buy').addEventListener('click', addToCart);
        });
    }

    function addToCart() {
        classie.add(cart, 'cart--animate');
        setTimeout(function() {cartItems.innerHTML = Number(cartItems.innerHTML) + 1;}, 200);
        onEndAnimation(cartItems, function() {
            classie.remove(cart, 'cart--animate');
        });
    }

    function recalcFlickities() {
        for(var i = 0, len = flkties.length; i < len; ++i) {
            flkties[i].resize();
        }
    }

    init();

})(window)
});
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createUser = function() {
       
        $http.post('/api/lists', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.users = data;
                // console.log(data+"users");
                alert("uspesno ste registrovali nalog");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteUser = function(id) {
        alert(id);
        $http.delete('/api/lists/' + id)
            .success(function(data) {
                $scope.users = data;
                console.log("obrisao");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});

//end of MAIN controller