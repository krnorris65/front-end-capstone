angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, AuthFactory, $http){

        // welcome message
		$scope.heading = "You are now logged in!"
        
        //userId of the current authenticated user
        const userId = AuthFactory.getUser().uid
        console.log("authId", userId)
    
        // gets users from database, if the uid on the user object matches the current auth user, then return the user
   

        // UserFactory.list().then(
        //     response => {
        //         console.log(response)
        //         const currentUser = response.forEach( user => {
        //             if(user.uid === userId){
        //                 return user
        //             }
        //         })
        //         debugger
        //         console.log("current", currentUser)
        //     } 
        // )

        const thisUser = UserFactory.currentUser(userId)
        console.log("this", thisUser)


        
	})