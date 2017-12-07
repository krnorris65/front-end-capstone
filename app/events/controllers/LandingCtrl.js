angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, AuthFactory, $http){

        // welcome message
		$scope.heading = "You are now logged in!"
        
        //userId of the current authenticated user
        const userId = AuthFactory.getUser().uid
        console.log("authId", userId)
    
        // gets users from database, if the uid on the user object matches the current auth user, then return the first name
        
        UserFactory.list().then(
            response => {
                response.forEach( user => {
                    console.log(user)
                 
                })
            }   
        )
	})