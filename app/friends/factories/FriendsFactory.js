angular.module("LifeReelApp")
.factory("FriendsFactory", function($http, AuthFactory, UserFactory) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        }, 
        "find": {
            value: function (searchString) {
                //finds all users who match the search result
                const result = UserFactory.listCache.filter(user => {
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
        }
    })
})