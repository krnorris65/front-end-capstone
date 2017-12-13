angular.module("LifeReelApp")
.controller("ReceivedCtrl", function($scope, FriendsFactory, UserFactory, $timeout, $window) {

    $scope.heading = "Received Requests"
    $scope.receivedRequests = []

    const reloadRequests = () => {
        FriendsFactory.receivedRequests().then(friends => {
            let unconfirmed = friends.filter(friend => {
                return friend.pending === true
            })
    
            $timeout()
            $scope.receivedRequests = unconfirmed
           
        })
    }

    reloadRequests()




    $scope.confirmRequest = (friend) => {
        const confirmedFriend = {
            "senderUID": friend.senderUID, 
            "senderName": friend.senderName,
            "receiverUID": friend.receiverUID,
            "receiverName": friend.receiverName,
            "date": Date.now(), //date the request was confirmed
            "pending": false //change pending to false
        }

        FriendsFactory.confirm(friend.friendId, confirmedFriend)
        $timeout( () => {
            reloadRequests()

        }, 300)
    }

})