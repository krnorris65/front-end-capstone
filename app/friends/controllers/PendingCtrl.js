angular.module("LifeReelApp")
    .controller("PendingCtrl", function($scope, FriendsFactory, UserFactory, $timeout) {

        $scope.heading = "Sent Requests"
        $scope.requests = []



        FriendsFactory.sentRequests().then(friends => {
            let pendingRequests = friends.filter(friend => {
                return friend.pending === true
            })

            $timeout()
            $scope.requests = pendingRequests
           
        })

    })