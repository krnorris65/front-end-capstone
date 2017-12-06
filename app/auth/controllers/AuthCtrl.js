app.controller("AuthCtrl", function($scope, AuthFactory) {
	$scope.auth = {}
  
	$scope.registerUser = function(registerNewUser) {
		AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister) {
			console.log(didRegister)
		})
	}

	$scope.loginUser = function () {
		AuthFactory.authenticate($scope.auth).then(function (didLogin) {
			$scope.login = {}
			$scope.register = {}
			$location.url("/")
		})
	}
})