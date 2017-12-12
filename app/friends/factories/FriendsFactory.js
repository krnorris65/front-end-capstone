angular.module("LifeReelApp")
.factory("FriendsFactory", function($http, AuthFactory) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        }, 
        "allUsers": {
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
                            data[key].userId = key //stores firebase key as the userKey
                            return data[key]
                        })
    
                        return this.cache
                    }).catch(function(error) {
                        console.log(error)
                    })
            }
        }
    })
})