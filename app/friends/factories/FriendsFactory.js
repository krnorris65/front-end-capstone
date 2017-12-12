angular.module("LifeReelApp")
.factory("FriendsFactory", function($http, AuthFactory, UserFactory) {
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
        },
        "find": {
            value: function (searchString) {
                //finds all users who match the search result
                const result = this.cache.filter(user => {
                    return user.first.toLowerCase().includes(searchString) ||
                           user.last.toLowerCase().includes(searchString) ||
                           user.fullName.toLowerCase().includes(searchString)
                })
                //doesn't return the current user
                const notUser = result.filter(user => {
                    if(UserFactory.cache.uid !== user.uid) {
                        return user
                    }
                })
                return notUser
            }
        },
    })
})