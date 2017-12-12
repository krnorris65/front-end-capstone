angular.module("LifeReelApp")
	.factory("UserFactory", function($http, AuthFactory) {
		return Object.create(null, {
			"cache": {
				value: null,
				writable: true
			},
			"currentUser": {
				value: function () {
					return firebase.auth().currentUser.getToken(true)
						.then(idToken => {
							const currentAuthUserId = AuthFactory.getUser().uid //gets the id of the authenicated user
							return $http({
								"url": `https://life-reel.firebaseio.com/users.json?auth=${idToken}&orderBy="uid"&equalTo="${currentAuthUserId}"`, //only gets that user from database
								"method": "GET"
							})
						}).then(response => {
							const data = response.data //user information as an object of objects
							this.cache = Object.keys(data).map(key => { //turns object into an array from the firebase keys and adds it to the cache so you don't have to make a $http call everytime data is needed
								data[key].userId = key //stores firebase key as the userId
								return data[key]
							})[0] //and returns the first index since there will only ever be one
							return this.cache //single object of user info
						
						}).catch(function(error) {
							console.log(error)
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


	
