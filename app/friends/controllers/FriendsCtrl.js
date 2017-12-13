angular.module("LifeReelApp")
    .controller("FriendsCtrl", function($scope, $location, FriendsFactory, $timeout){

        $scope.heading = "Current Friends"

        $scope.allFriends = []

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
        
        $scope.friendReel = (friend) => {
            $location.url("/friends/pending")
            
        }
        $scope.removeFriend = (friend) => {
            FriendsFactory.delete(friend.friendKey)

        }
        

        $scope.showPending = () => {
            $location.url("/friends/pending")
        }
        
        $scope.showCache = () => {
            console.log("sent", FriendsFactory.sentCache)
            console.log("received", FriendsFactory.receivedCache)
        }

    })