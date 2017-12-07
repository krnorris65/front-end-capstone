angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory){

        // welcome message
		$scope.heading = "You are now logged in!"
        
        // gets users from database, if the uid on the user object matches the current auth user, then return the user
   
        
        UserFactory.currentUser().then(user => {
            
            console.log(user)
        })

        
	})