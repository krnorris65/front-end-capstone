angular.module("LifeReelApp").controller("NavCtrl",
	function ($scope, AuthFactory, UserFactory) {
		


		/*
    Just a pass-through method to the AuthFactory method of the
    same name.
    */
		$scope.isAuthenticated = () => AuthFactory.isAuthenticated()


		/*
    Unauthenticate the client.
    */
		$scope.logout = () => AuthFactory.logout()


		

	}
)