angular.module("LifeReelApp", ["ngRoute"])

angular.module("LifeReelApp").run(function (FIREBASE_CONFIG) {
	firebase.initializeApp(FIREBASE_CONFIG)
})

angular.module("LifeReelApp").config(function ($routeProvider) {
	/**
     * Configure all Angular application routes here
     */
	$routeProvider.
		when("/auth", {
			templateUrl: "app/auth/partials/auth.html",
			controller: "AuthCtrl"
		})
		.otherwise("/auth")

})