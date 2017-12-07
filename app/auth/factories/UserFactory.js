angular.module("LifeReelApp")
	.factory("UserFactory", function($http, AuthFactory) {
		return Object.create(null, {
			"cache": {
				value: null,
				writable: true
			},
			"list": {
				value: function () {
					return firebase.auth().currentUser.getToken(true)
						.then(idToken => {
							return $http({
								"url": `https://life-reel.firebaseio.com/users.json?auth=${idToken}`,
								"method": "GET"
							})
						}).then(response => {
							const data = response.data
							this.cache = Object.keys(data).map(key => {
								return data[key]
							})
		
							return this.cache
						}).catch(function(error) {
							console.log(error)
						})
				}
			},
			"currentUser": {
				value: function () {
					return firebase.auth().currentUser.getToken(true)
						.then(idToken => {
							console.log(idToken)
							return $http({
								"url": `https://life-reel.firebaseio.com/users.json?auth=${idToken}&orderBy="uid"&equalTo="${AuthFactory.getUser().uid}"`,
								"method": "GET"
							})
						})
				}
			},
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
			},
			"delete": {
				value: function (key) {
					return firebase.auth().currentUser.getToken(true)
						.then(idToken => {
							return $http({
								"url": `https://life-reel.firebaseio.com/users/${key}/.json?auth=${idToken}`,
								"method": "DELETE"
							})
						}).catch(function(error) {
							console.log(error)
						})
				}
			}
		})
	})


	
