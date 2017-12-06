angular.module("LifeReelApp")
	.controller("AuthCtrl", function($scope, $location, AuthFactory) {
		$scope.auth = {}

		$scope.loginButton = () => {
			$location.url("/login")
		}

		$scope.registerButton = () => {
			$location.url("/register")
		}

		$scope.loginUser = function (credentials) {
			AuthFactory.authenticate(credentials).then(function (didLogin) {
				$scope.login = {}
				$scope.register = {}
				$location.url("/")
			})
		}

		$scope.registerUser = function(registerNewUser) {
			AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
				loginUser(registerNewUser)
			})
		}

		$scope.logoutUser = function(){
			AuthFactory.logout()
			$location.url("/auth")
		}

	})