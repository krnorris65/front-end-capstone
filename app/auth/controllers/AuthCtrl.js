angular.module("LifeReelApp")
	.controller("AuthCtrl", function($scope, $location, AuthFactory, UserFactory) {

		//when user clicks login button, the login form appears
		$scope.loginButton = () => {
			$location.url("/login")
		}
		
		//when user clicks register butoon the register form appears
		$scope.registerButton = () => {
			$location.url("/register")
		}
		
		//object that email and password are added to
		$scope.auth = {}

		//object that user's first name and last name are added to
		$scope.user = {}

		$scope.loginUser = function (credentials) {
			AuthFactory.authenticate(credentials).then(function (didLogin) {
				$scope.login = {}
				$scope.register = {}
				$location.url("/events")
			})
		}

		$scope.registerUser = function(registerNewUser, newUserInfo) {
			AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
				$scope.loginUser(registerNewUser)
			}).then((loggedIn) => {
				newUserInfo.userAuthId = firebase.auth().currentUser.uid
				UserFactory.add(newUserInfo)
			})
		}

		$scope.logoutUser = function(){
			AuthFactory.logout()
			$location.url("/auth")
		}

	})