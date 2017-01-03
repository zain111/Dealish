angular.module('app.controllers', [])

.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|waze|geo):/);
}])

  
.controller('menuCtrl', function($scope,$http,sharedCartService,sharedFilterService,$state) {

	

	//put cart after menu
	// var cart = sharedCartService.cart;
	
	
	
	// $scope.slide_items=[    {"p_id":"1",
	// 					 "p_name":"New Chicken Maharaja",
	// 					 "p_description":"Product Description",
	// 					 "p_image_id":"slide_1",
	// 					 "p_price":"183"},
						
	// 					{"p_id":"2",
	// 					"p_name":"Big Spicy Chicken Wrap",
	// 					"p_description":"Product Description",
	// 					"p_image_id":"slide_2",
	// 					"p_price":"171"},
						
	// 					{"p_id":"3",
	// 					"p_name":"Big Spicy Paneer Wrap",
	// 					"p_description":"Product Description",
	// 					"p_image_id":"slide_3",
	// 					"p_price":"167"}
	// 			   ];
					   
	// function openWaze() {
 //        WazeLink.open( 'waze://?ll=3.203794, 101.641378' );
 //      };
		
   //   $scope.openWaze = function (){
					
   //   		WazeLink.open( 'waze://?ll=3.21133, 101.6406' );
 		// };
    

    		   
	
	
	$scope.noMoreItemsAvailable = false; // lazy load list
	
	

				
  	//loads the menu----onload event
	$scope.$on('$stateChangeSuccess', function() {
		$scope.loadMore();  //Added Infine Scroll
	});
	 
	// Loadmore() called inorder to load the list 
	$scope.loadMore = function() {
		
			str=sharedFilterService.getUrl();
			$http.get(str).success(function (response){
				$scope.menu_items = response.records;
				$scope.hasmore=response.has_more;	//"has_more": 0	or number of items left
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});	
			
			//more data can be loaded or not
			if ( $scope.hasmore == 0 ) {
			  $scope.noMoreItemsAvailable = true;
			}
	};
	 
	
	 //show product page
	// $scope.showProductInfo=function (id,desc,img,name,price) {	 
	// 	 sessionStorage.setItem('product_info_id', id);
	// 	 sessionStorage.setItem('product_info_desc', desc);
	// 	 sessionStorage.setItem('product_info_img', img);
	// 	 sessionStorage.setItem('product_info_name', name);
	// 	 sessionStorage.setItem('product_info_price', price);
	// 	 window.location.href = "#/page13";
	//  };


$http.get("http://moeza.xyz/food_menu.php")
    .then(function (response) {$scope.names = response.data.records;
   console.log($scope.names);
   $scope.filterFunction = function(element) {
    return element.name.match(/^Ma/) ? true : false;
  };
   });

$scope.whichpromotion = $state.params.aID;

  
				   
	 
})

.controller('indexCtrl', function($scope,sharedCartService) {
	//$scope.total = 10; 
})
   
.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
		$scope.user = {};
		
		$scope.login = function() {
			str="http://moeza.xyz/user-details.php?e="+$scope.user.email+"&p="+$scope.user.password;
			$http.get(str)
			.success(function (response){
				console.log(response.records);
				if(response.records === "") {
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'e-mail or password incorrect!'
					});
				}
				else {
					$scope.user_details = response.records;



					sessionStorage.setItem('loggedin_username', $scope.user_details.username);
					sessionStorage.setItem('loggedin_email', $scope.user_details.email);
					sessionStorage.setItem('loggedin_phone', $scope.user_details.phone);
					sessionStorage.setItem('loggedin_address', $scope.user_details.address);
					
				
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
						lastView = $ionicHistory.backView();
						console.log('Last View',lastView);
						//if(lastView.stateId=="checkOut"){ $state.go('checkOut', {}, {location: "replace", reload: true}); }
						//else{
							$state.go('profile', {}, {location: "replace", reload: true});
							//}
				}
			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'e-mail or password incorrect!'
					});
			});
		};
		
})





   
.controller('signupCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {

	$scope.signup=function(data){
			
			var link = 'http://moeza.xyz/signup.php?un='+data.username+'&email='+data.email+'&ps='+data.password+'&ph='+data.phone+'&add='+data.address+'';
			console.log(link);
			$http.get(link)
			.then(function (res){	
				$scope.response = res.data.result; 
				

				if($scope.response.exists=="1"){
					$scope.title="Email Already exists";
					$scope.template="Please click forgot password if necessary";
				
				}
				else if($scope.response.created=="1"){
					$scope.title="Account Created!";
					$scope.template="Your account has been successfully created!";
					
					//no back option
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
					$state.go('login', {}, {location: "replace", reload: true});
				
				}

				else{
					$scope.title="Failed";
					$scope.template="Contact Our Technical Team";
				}
				
				var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: $scope.template
				});
				
				
			});
			
	}
})
   
.controller('filterByCtrl', function($scope,sharedFilterService) {

  $scope.Categories = [
    {id: 1, name: 'Western Foods'},
    {id: 2, name: 'Arabic Foods'}
  ];
  
  $scope.getCategory = function(cat_list){
    categoryAdded = cat_list;
	var c_string=""; // will hold the category as string
	
	for(var i=0;i<categoryAdded.length;i++){ c_string+=(categoryAdded[i].id+"||"); }
	
	c_string = c_string.substr(0, c_string.length-2);
	sharedFilterService.category=c_string;
	window.location.href = "#/page1";
  };
	

})
   
.controller('sortByCtrl', function($scope,sharedFilterService) {
	$scope.sort=function(sort_by){
		sharedFilterService.sort=sort_by;
		console.log('sort',sort_by);		
		window.location.href = "#/page1";
	};
})
   
.controller('paymentCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope,$rootScope,$ionicHistory,$state) {

		$scope.loggedin_username= sessionStorage.getItem('loggedin_username');
		$scope.loggedin_email= sessionStorage.getItem('loggedin_email');
		$scope.loggedin_phone= sessionStorage.getItem('loggedin_phone');
		$scope.loggedin_address= sessionStorage.getItem('loggedin_address');
		
					
		
		$scope.logout=function(){


					sessionStorage.setItem('loggedin_username', '');
					sessionStorage.setItem('loggedin_email', '');
					sessionStorage.setItem('loggedin_phone', '');
					sessionStorage.setItem('loggedin_address', '');
			
				delete sessionStorage.loggedin_username;
				delete sessionStorage.loggedin_email;
				delete sessionStorage.loggedin_phone;
				delete sessionStorage.loggedin_address;
				
				
				console.log('Logoutctrl',sessionStorage.getItem('loggedin_email'));
				
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				$state.go('menu', {}, {location: "replace", reload: true});

		};
})
   
.controller('myrestaurantCtrl', function($scope,$ionicHistory) {
	$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

})
   
.controller('editProfileCtrl', function($scope,$ionicHistory) {
	$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

})
   
.controller('favoratesCtrl', function($scope,$ionicHistory) {

$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

})
   
.controller('productPageCtrl', function($scope,$http) {

		$http.get("http://moeza.xyz/food_menu.php")
    .then(function (response) {$scope.names = response.data.records;
   });

	//onload event
	angular.element(document).ready(function () {
		$scope.id= sessionStorage.getItem('product_info_id');
		$scope.desc= sessionStorage.getItem('product_info_desc');
		$scope.img= "img/"+ sessionStorage.getItem('product_info_img')+".jpg";
		$scope.name= sessionStorage.getItem('product_info_name');
		$scope.price= sessionStorage.getItem('product_info_price');
	});
// $scope.whichpromotion = $state.params.aID;



})

.controller('DetailCtrl', function($scope,$http, $state) {
	var p_id = $state.params.aID;
	
	$http.get("http://moeza.xyz/product_list.php?p_id="+p_id)
    .then(function (response) {$scope.names = response.data; 
    	console.log($scope.names);
    });
  
  // $scope.whichpromotion = $state.params.aID;
})



.controller('geolocationCtrl', function($scope, $state, $cordovaGeolocation,$http,$ionicLoading) {
	$ionicLoading.show({
    template: '<i class="icon ion-loading-a"></i><br>Loading...',
    noBackdrop: true,
    duration: 3000
});
	var marker3 = new Array();
	$http.get("http://moeza.xyz/food_menu.php")
    .then(function (response) {$scope.names = response.data.records;
   console.log($scope.names);
   for (var i = 0, length = $scope.names.length; i < length; i++) {
  	  var data = $scope.names[i],
      latLng = new google.maps.LatLng(data.p_latitude , data.p_longitude );
      console.log("lat: " + data.p_latitude + i);

      marker3[i] = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    }); 
      
  }
   });
    



    var options = {timeout: 10000, enableHighAccuracy: true};
    var user;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    user = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // var ICT = new google.maps.LatLng(3.253638, 101.7292164);
    var ICT2 = new google.maps.LatLng(3.21133, 101.6406);
    var satuGadget = new google.maps.LatLng(3.076583, 101.588485);
    
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer; 
 
    var mapOptions = {
      center: user,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
      
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
    var request = {
            origin : user,
            destination : satuGadget,
            travelMode : google.maps.TravelMode.DRIVING
        };
        
    directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

    directionsDisplay.setMap(map); 
      
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
    var marker2 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: user
    }); 
          
    var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: ICT2
    }); 
        
    roar(user, ICT2, directionsService,directionsDisplay);
 
    var infoWindow = new google.maps.InfoWindow({
      content: "Your Location is Here"
    });
 
    google.maps.event.addListener(marker2, 'click', function () {
      infoWindow.open($scope.map, marker2);
    });
 
      });
      
      
    
    }, function(error){
    console.log("Could not get location");
  });
    
    
    
    
    
    function roar(user, satuGadget, directionsService,directionsDisplay){
        var request = {
            origin : user,
            destination : satuGadget,
            travelMode : google.maps.TravelMode.DRIVING
    };
        
    directionsService.route(request, function(response, status) {
            
            if (status == google.maps.DirectionsStatus.OK) {
                console.log(response);
                directionsDisplay.setDirections(response);
            }
            else {
                alert("test");
                console.log("error " + status);
            }
        });

    }
//    directionsDisplay.setMap(map); 
    
})
 
 // .controller('AppCtrll', function($scope, $http, $ionicLoading) {
 //  $scope.show = function() {
 //    $ionicLoading.show({
 //      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
 //    });
 //  };
//   .controller('LoadingCtrl', function($scope, $ionicLoading) {
//   $scope.show = function() {
//     $ionicLoading.show({
//       template: 'Loading...',
//       duration: 3000
//     }).then(function(){
//        console.log("The loading indicator is now displayed");
//     });
//   };
//   $scope.hide = function(){
//     $ionicLoading.hide().then(function(){
//        console.log("The loading indicator is now hidden");
//     });
//   };
// });
