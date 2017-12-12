angular.module("LifeReelApp")
    .controller("ShowCtrl", function($scope, FriendsFactory, $timeout){

        $scope.heading = "Added Friends"
        $timeout(() => {

            $scope.sent = FriendsFactory.sentCache.filter(friend => {
                return friend.pending === false
            })
            $scope.received = FriendsFactory.receivedCache.filter(friend => {
                return friend.pending === false
            })
            console.log("sent", $scope.sent)
            console.log("received", $scope.received)
            

        }, 500)
    })