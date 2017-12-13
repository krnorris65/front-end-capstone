angular.module("LifeReelApp")
    .controller("SentCtrl", function($scope, FriendsFactory, UserFactory, $timeout) {

        $scope.heading = "Sent Requests"
        $scope.sentRequests = []

        // //if you sent someone a friend request and they have not confirmed it yet then it appears here

        $scope.sentRequests = FriendsFactory.sentCache.filter(friend => {
            return friend.pending === true
        })

    })