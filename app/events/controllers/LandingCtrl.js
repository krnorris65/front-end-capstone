angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, $timeout){

        
        $timeout( ()=> {
            // gets the current user from the database
            UserFactory.currentUser().then(user => {
                
                // welcome message
                const firstName = user.first
                $timeout()
                $scope.heading = `Welcome ${firstName}!`
            })
        }, 150)
            

	})