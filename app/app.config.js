angular.module("LifeReelApp").constant("FIREBASE_CONFIG", {
	apiKey: "AIzaSyBSmCGgrcgzzSjDzc6stzPdwaFR5agGkfs",
	authDomain: "life-reel.firebaseapp.com",
	databaseURL: "https://life-reel.firebaseio.com",
	projectId: "life-reel",
	storageBucket: "",
	messagingSenderId: "81694446627"
})

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