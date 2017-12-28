angular.module("LifeReelApp")
    .controller("FriendsCtrl", function($scope, $location, FriendsFactory, $timeout, $route){

        $scope.heading = "Friends"

        $scope.allFriends = []

        // filters through sent requests and adds any friends that have a pending statues of false and adds them to the allFriends array
        FriendsFactory.sentRequests().then(friends => {
            friends.forEach(friend => {
                if(friend.pending === false) {
                    let friendObj = {
                        "friendName": friend.receiverName,
                        "friendUID": friend.receiverUID,
                        "friendKey": friend.friendId,
                        "date": friend.date
                    }
                    $timeout()
                    $scope.allFriends.push(friendObj)
                }
            })
  
        })

        // filters through received requests and adds any friends that have a pending statues of false and adds them to the allFriends array
        FriendsFactory.receivedRequests().then(friends => {
            friends.forEach(friend => {
                if(friend.pending === false) {
                    let friendObj = {
                        "friendName": friend.senderName,
                        "friendUID": friend.senderUID,
                        "friendKey": friend.friendId,
                        "date": friend.date
                    }
                    $timeout()
                    $scope.allFriends.push(friendObj)
                }
            })
  
        })

        // removes friends from friend list
        $scope.removeFriend = (friend) => {
            FriendsFactory.delete(friend.friendKey)
            $timeout(() => {
                $route.reload()

            }, 300)

        }
        
        // shows pending friend requests
        $scope.showPending = () => {
            $location.url("/friends/pending")
        }
        

    })