angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, $timeout, $location){

        
        $timeout( ()=> {
            // gets the current user from the database
            UserFactory.currentUser().then(user => {
                
                // welcome message
                const firstName = user.first
                $timeout()
                $scope.heading = `Welcome ${firstName}!`
            })
        }, 150)

        $scope.eventForm = () => {
            $location.url("/add")
        }
            

	})