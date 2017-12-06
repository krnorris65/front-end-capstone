angular.module("LifeReelApp")
	.factory("AuthFactory", function($http, $location, $timeout, $route) {
		let currentUserData = null

		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				currentUserData = user
	
				if ($location.url() !== "/landing") {
					$timeout(function () {
						$location.url("/landing")
					}, 100)
				} else {
					$route.reload()
				}
	
			} else {
				currentUserData = null
				console.log("User is not authenticated")
				$timeout(function () {
					$location.url("/auth")
				}, 100)
			}
		}) 

		return Object.create(null, {
			isAuthenticated: {
				value: () => {
					return firebase.auth().currentUser ? true : false
				}
			},
			getUser: {
				value: () => {
					return firebase.auth().currentUser
				}
			},
			logout: {
				value: () => {
					firebase.auth().signOut()
				}
			},
			authenticate: {
				value: credentials => {
					return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
						.catch(function(error) {
							alert(error)
						})
				}
			},
			registerWithEmail: {
				value: user => {
					return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
						.catch(function(error) {
							alert(error)
						})
				}
			}
		})
	})