angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, $timeout, $location, EventFactory){
        //loads all users
        UserFactory.allUsers()
        // gets the current user from the database
        UserFactory.currentUser()

        $scope.eventForm = () => {
            $location.url("/add")
        }

        $scope.viewReel = () => {
            $location.url("/reel")
        }

        

	})