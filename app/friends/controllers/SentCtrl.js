angular.module("LifeReelApp")
    .controller("SentCtrl", function($scope, FriendsFactory, UserFactory, $timeout) {

        $scope.heading = "Sent Requests"
        $scope.sentRequests = []



        FriendsFactory.sentRequests().then(friends => {
            let pendingFriends = friends.filter(friend => {
                return friend.pending === true
            })

            $timeout()
            $scope.sentRequests = pendingFriends
           
        })

    })