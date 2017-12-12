angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, $timeout, $location, EventFactory){
        //loads all users
        UserFactory.allUsers()

        $timeout( ()=> {
            // gets the current user from the database
            UserFactory.currentUser().then(user => {
                
                // welcome message
                const firstName = user.first
                $timeout()
                $scope.heading = `Welcome ${firstName}!`
                $scope.addButton = "Add New Segment"
            })
        }, 500)

        $scope.eventForm = () => {
            $location.url("/add")
        }

        

	})