angular.module("LifeReelApp")
    .controller("PendingCtrl", function($scope, FriendsFactory, UserFactory, $timeout) {

        $scope.heading = "Sent Requests"
        $scope.sentRequests = []

        let friendArray = []

        FriendsFactory.friendsList().then(friend => {
            friendArray = friend
            console.log("all", friendArray)
        }).then(results => {
            $timeout()
            $scope.sentRequests = friendArray.filter( friend => {
                if(friend.senderUID === UserFactory.cache.uid) {
                    return friend
                }
            })
            
            console.log("sent", $scope.sentRequests)
        })

        

    })