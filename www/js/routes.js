angular.module('app.routes', [])
.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|waze|geo|mailto|chrome-extension|local|file):/);
}])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
  $ionicConfigProvider.navBar.alignTitle("center");
  $stateProvider
  
  
      
        
    .state('menu', {
      url: '/page1',
      templateUrl: 'templates/menu.html',
      controller: 'menuCtrl'
    })
        
      
    
      
        
    // .state('details', {
    //   url: '/page2/:aID',
    //   templateUrl: 'templates/details.html',
    //   controller: 'productPageCtrl'
    // })
        
      
    
      
        
    .state('geolocation', {
      url: '/page3',
      templateUrl: 'templates/geolocation.html',
      controller: 'geolocationCtrl'
    })
	
	
	


      
        
    .state('login', {
      cache: false,
      url: '/page4',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
	  
		resolve:{
			"check":function($location){  
				if(sessionStorage.getItem('loggedin_email')){ $location.path('/page9');   }
				else									 {  $location.path('/page4');   }
			}
		}
    })
        
      
    
      
        
    .state('signup', {
      url: '/page5',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('filterBy', {
      url: '/page6',
      templateUrl: 'templates/filterBy.html',
      controller: 'filterByCtrl'
    })
        
      
    
      
        
    .state('sortBy', {
      url: '/page7',
      templateUrl: 'templates/sortBy.html',
      controller: 'sortByCtrl'
    })
        
      
    
      
        
    .state('payment', {
      url: '/page8',
      templateUrl: 'templates/payment.html',
      controller: 'paymentCtrl'
    })
        
      
    
      
        
    .state('profile', {
      cache: false,
      url: '/page9',
      templateUrl: 'templates/profile.html',
      controller: 'profileCtrl'  
    })
        
      
    
      
        
    .state('myrestaurant', {
      url: '/page10',
      templateUrl: 'templates/myrestaurant.html',
      controller: 'myrestaurantCtrl',

    })
        
      
    
      
        
    .state('editProfile', {
      url: '/page11',
      templateUrl: 'templates/editProfile.html',
      controller: 'editProfileCtrl'
    })
        
      
    
      
        
    .state('favorates', {
      url: '/page12',
      templateUrl: 'templates/favorates.html',
      controller: 'favoratesCtrl'
    })
        
      
    
      
        
    .state('promotion', {
      url: '/page13',
      templateUrl: 'templates/promotion.html',
      controller: 'menuCtrl'
    })

    .state('details', {
      url: '/page14/:aID',
      templateUrl: 'templates/details.html',
      controller: 'DetailCtrl'
    })
        
      
    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});