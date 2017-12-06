angular.module("LifeReelApp")
	.factory("UserFactory", function($http) {
		return Object.create(null, {
			"add": {
				value: function (user) {
					return firebase.auth().currentUser.getToken(true)
						.then(idToken => {
							return $http({
								"url": `https://life-reel.firebaseio.com/users.json?auth=${idToken}`,
								"method": "POST",
								"data": JSON.stringify(user)
							})
						}).catch(function(error) {
							console.log(error)
						})
				}
			}
		})
	})


	
