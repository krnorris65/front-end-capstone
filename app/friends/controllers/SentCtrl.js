angular.module("LifeReelApp")
    .controller("SentCtrl", function($scope, FriendsFactory, UserFactory, $timeout) {

        $scope.heading = "Sent Requests"
        $scope.sentRequests = []

        // //if you sent someone a friend request and they have not confirmed it yet then it appears here
        FriendsFactory.sentRequests().then(friends => {
            friends.forEach(friend => {
                if(friend.pending === true) {
                    $timeout()
                    $scope.sentRequests.push(friend)
                }
            })
  
        })

    })


    
