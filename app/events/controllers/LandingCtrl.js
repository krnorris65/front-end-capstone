angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, $timeout){

        // welcome message
        // $scope.heading = ""
        
        $timeout( ()=> {
            // gets the current user from the database
            UserFactory.currentUser().then(user => {
               
                const firstName = user.first
                $timeout()
                $scope.heading = `Welcome ${firstName}!`
            })
        }, 100)
            

	})