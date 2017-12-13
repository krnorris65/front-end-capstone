angular.module("LifeReelApp")
.controller("ReceivedCtrl", function($scope, FriendsFactory, UserFactory, $timeout, $location) {

    $scope.heading = "Pending Requests"
    $scope.receivedRequests = []

  
    $scope.receivedRequests = FriendsFactory.receivedCache.filter(friend => {
        return friend.pending === true
    })

    $scope.confirmRequest = (friend) => {
        const confirmedFriend = {
            "senderUID": friend.senderUID, 
            "senderName": friend.senderName,
            "receiverUID": friend.receiverUID,
            "receiverName": friend.receiverName,
            "date": Date.now(), //date the request was confirmed
            "pending": false //change pending to false
        }

        //adds friend to friends list
        FriendsFactory.confirm(friend.friendId, confirmedFriend)
        
        //brings user back to their friends
        $timeout( () => {
            $location.url("/friends/list")

        }, 500)
    }

    $scope.deleteRequest = (friend) => {           
        //deletes friend request
        FriendsFactory.delete(friend.friendId)
        
        //brings user back to their friends
        $timeout( () => {
            $location.url("/friends/list")

        }, 500)
    }

})