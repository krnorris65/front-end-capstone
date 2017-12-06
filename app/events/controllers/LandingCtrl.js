angular.module("LifeReelApp")
	.controller("LandingCtrl", function($scope, UserFactory, AuthFactory){

		$scope.heading = "You are now logged in!"
        
        const userId = AuthFactory.getUser().uid
        const tokenId = AuthFactory.getUser().refreshToken
        console.log(tokenId)

	})