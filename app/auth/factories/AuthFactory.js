angular.module("LifeReelApp")
	.factory("AuthFactory", function($http) {
		let currentUserData = null

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