angular.module("LifeReelApp")
	.controller("AuthCtrl", function($scope, $location, AuthFactory, UserFactory) {

		
		//object that email and password are added to
		$scope.auth = {}

		//object that user's first name and last name are added to
		$scope.user = {}

		//when a user logs in, firebase checks to see if they already exist and if so brings them to the landing page
		$scope.loginUser = function (credentials) {
			AuthFactory.authenticate(credentials).then(function (didLogin) {
			})
		}

		//when a user registers an account, it first creates a new user with firebase using the email and password provided and logs them in to Life Reel
		$scope.registerUser = function(registerNewUser, newUserInfo) {
			AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
				$scope.loginUser(registerNewUser)
			}).then((loggedIn) => {
				// then a user object is created with the user's first and last names. it is linked to the authentication with the uid 
				newUserInfo.fullName = $scope.user.first + " " + $scope.user.last
				newUserInfo.uid = firebase.auth().currentUser.uid
				UserFactory.add(newUserInfo)
			})
		}

		//logs user out
		$scope.logoutUser = function(){
			AuthFactory.logout()
			$location.url("/auth")
		}

	})