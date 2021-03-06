angular.module("LifeReelApp")
	.factory("AuthFactory", function($http, $location, $timeout, $route) {
		let currentUserData = null

		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				currentUserData = user
				console.log("User is authenticated")
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
			notAuthenticated: {
				value: () => {
					return firebase.auth().currentUser ? false : true
				}
			},
			getUser: {
				value: () => {
					return currentUserData
				}
			},
			logout: {
				value: () => {
					firebase.auth().signOut()
				}
			},
			authenticate: {
				value: credentials => {
					try {
						return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
							.catch(function(error) {
								alert(error)
							})

					} catch (ex) {
							alert(ex)
					}
				}
			},
			registerWithEmail: {
				value: user => {
					try {
						return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
						.catch(function(error) {
							alert(error)
						})

					} catch (ex) {
							alert(ex)
					}
				}
			}
		})
	})