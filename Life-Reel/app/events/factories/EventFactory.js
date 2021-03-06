angular.module("LifeReelApp")
.factory("EventFactory", function($http, AuthFactory) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
        "userEvents": {
            value: function () {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        const currentAuthUserId = AuthFactory.getUser().uid //gets the id of the authenicated user
                        return $http({
                            "url": `https://life-reel.firebaseio.com/events.json?auth=${idToken}&orderBy="userUID"&equalTo="${currentAuthUserId}"`, //only gets that user from database
                            "method": "GET"
                        })
                    }).then(response => {
                        const data = response.data //user information as an object of objects
                        this.cache = Object.keys(data).map(key => { //turns object into an array from the firebase keys 
                            data[key].eventId = key //stores firebase key as the eventId
                            return data[key]
                        }) //and returns the first index since there will only ever be one
                        return this.cache //single object of user info
                    
                    })
            }
        },
        "single": {
            value: function(key) {
                return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $http({
                        "url": `https://life-reel.firebaseio.com/events/${key}/.json?auth=${idToken}`,
                        "method": "GET"
                    }).then(response => {
                        return response.data
                    })
                }).catch(function(error) {
                    console.log(error)
                })
            }
        },
        "add": {
            value: function (event) {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        return $http({
                            "url": `https://life-reel.firebaseio.com/events.json?auth=${idToken}`,
                            "method": "POST",
                            "data": JSON.stringify(event)
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
                            "url": `https://life-reel.firebaseio.com/events/${key}/.json?auth=${idToken}`,
                            "method": "DELETE"
                        })
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        },
        "edit": {
            value: function (key, event) {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        return $http({
                            "url": `https://life-reel.firebaseio.com/events/${key}.json?auth=${idToken}`,
                            "method": "PUT",
                            "data": JSON.stringify(event)
                        })
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        },
        "friendEvents": {
            value: function (friendId) {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        return $http({
                            "url": `https://life-reel.firebaseio.com/events.json?auth=${idToken}&orderBy="userUID"&equalTo="${friendId}"`, //only gets that user from database
                            "method": "GET"
                        })
                    }).then(response => {
                        const data = response.data //user information as an object of objects
                        const results = Object.keys(data).map(key => { //turns object into an array from the firebase keys 
                            data[key].eventId = key //stores firebase key as the eventId
                            return data[key]
                        }) //and returns the first index since there will only ever be one
                        return results //single object of user info
                    
                    })
            }
        },
    })
})