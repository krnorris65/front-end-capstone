angular.module("LifeReelApp")
.factory("FriendsFactory", function($http, AuthFactory, UserFactory) {
    return Object.create(null, {
        "sentCache": {
            value: null,
            writable: true
        },
        "receivedCache": {
            value: null,
            writable: true
        },  
        "sentRequests": {
            value: function () {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        const currentAuthUserId = AuthFactory.getUser().uid //gets the id of the authenicated user
                        return $http({
                            "url": `https://life-reel.firebaseio.com/friends.json?auth=${idToken}&orderBy="senderUID"&equalTo="${currentAuthUserId}"`,
                            "method": "GET"
                        })
                    }).then(response => {
                        const data = response.data //friend information as an object of objects
                        this.sentCache = Object.keys(data).map(key => { //turns object into an array from the firebase keys and adds it to the cache so you don't have to make a $http call everytime data is needed
                            data[key].friendId = key //stores firebase key as the friendId
                            return data[key]
                        })
                        return this.sentCache //array of all sent requests
                    
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        },
        "receivedRequests": {
            value: function () {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        const currentAuthUserId = AuthFactory.getUser().uid //gets the id of the authenicated user
                        return $http({
                            "url": `https://life-reel.firebaseio.com/friends.json?auth=${idToken}&orderBy="receiverUID"&equalTo="${currentAuthUserId}"`,
                            "method": "GET"
                        })
                    }).then(response => {
                        const data = response.data //friend information as an object of objects
                        this.receivedCache = Object.keys(data).map(key => { //turns object into an array from the firebase keys and adds it to the cache so you don't have to make a $http call everytime data is needed
                            data[key].friendId = key //stores firebase key as the friendId
                            return data[key]
                        })
                        return this.receivedCache //array of all sent requests
                    
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        },
        "find": {
            value: function (searchString) {
                //gets listCache of all users from the UserFactory and finds the users that match the search result, but doesn't return the current user
                const result = UserFactory.listCache.filter(user => {
                    return user.first.toLowerCase().includes(searchString) ||
                           user.last.toLowerCase().includes(searchString) ||
                           user.fullName.toLowerCase().includes(searchString)
                })
                //filters out the current user
                const notUser = result.filter(user => {
                    if(UserFactory.cache.uid !== user.uid) {
                        return user
                    }
                })
                return notUser
            }
        },
        "add": {
            value: function (friend) {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        return $http({
                            "url": `https://life-reel.firebaseio.com/friends.json?auth=${idToken}`,
                            "method": "POST",
                            "data": JSON.stringify(friend)
                        })
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        },
        "confirm": {
            value: function (key, friend) {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        return $http({
                            "url": `https://life-reel.firebaseio.com/friends/${key}.json?auth=${idToken}`,
                            "method": "PUT",
                            "data": JSON.stringify(friend)
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
                            "url": `https://life-reel.firebaseio.com/friends/${key}/.json?auth=${idToken}`,
                            "method": "DELETE"
                        })
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        },
        "currentFriend": {
            value: function (friendId) {
                return firebase.auth().currentUser.getToken(true)
                    .then(idToken => {
                        return $http({
                            "url": `https://life-reel.firebaseio.com/users.json?auth=${idToken}&orderBy="uid"&equalTo="${friendId}"`, //only gets that user from database
                            "method": "GET"
                        })
                    }).then(response => {
                        const data = response.data //user information as an object of objects
                        const results = Object.keys(data).map(key => { //turns object into an array from the firebase keys and adds it to the cache so you don't have to make a $http call everytime data is needed
                            data[key].userId = key //stores firebase key as the userId
                            return data[key]
                        })[0] //and returns the first index since there will only ever be one
                        return results
                    
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        },
    })
})