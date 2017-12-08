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
		.when("/login", {
			templateUrl: "app/auth/partials/login.html",
			controller: "AuthCtrl"
		})
		.when("/register", {
			templateUrl: "app/auth/partials/register.html",
			controller: "AuthCtrl"
		})
		.when("/landing", {
			templateUrl: "app/events/partials/landing.html",
			controller: "LandingCtrl"
		}).when("/add", {
			templateUrl: "app/events/partials/addEvent.html",
			controller: "AddEventCtrl"
		}).when("/reel", {
			templateUrl: "app/events/partials/showEvents.html",
			controller: "ShowEventsCtrl"
		})
		.otherwise("/auth")

})