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
							const currentAuthUserId = AuthFactory.getUser().uid //gets the id of the authenicated user
							return $http({
								"url": `https://life-reel.firebaseio.com/users.json?auth=${idToken}&orderBy="uid"&equalTo="${currentAuthUserId}"`, //only gets that user from database
								"method": "GET"
							})
						}).then(response => {
							const data = response.data //user information as an object of objects
							const user = Object.keys(data).map(key => { //turns object into an array from the firebase keys 
								return data[key]
							})[0] //and returns the first index since there will only ever be one
							console.log("testing")
							return user //single object of user info
						
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


	
