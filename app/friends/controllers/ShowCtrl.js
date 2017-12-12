angular.module("LifeReelApp")
    .controller("ShowCtrl", function($scope, FriendsFactory, $timeout){

        $scope.allFriends = []

        $scope.heading = "Added Friends"
        $timeout(()=>{
            if(FriendsFactory.sentCache !== null || FriendsFactory.receivedCache !== null) {
                if(FriendsFactory.sentCache.length > 0){
                    FriendsFactory.sentCache.forEach(friend => {
                        if(friend.pending === false) {
                            let friendObj = {
                                "friendName": friend.receiverName,
                                "friendUID": friend.receiverUID,
                                "friendKey": friend.friendID,
                                "date": friend.date
                            }
                            $scope.allFriends.push(friendObj)
                        }
                    })
                }
    
            
                if(FriendsFactory.receivedCache.length > 0) {
                    FriendsFactory.receivedCache.forEach(friend => {
                        if(friend.pending === false) {
                            let friendObj = {
                                "friendName": friend.senderName,
                                "friendUID": friend.senderUID,
                                "friendKey": friend.friendId,
                                "date": friend.date
                            }
                            $scope.allFriends.push(friendObj)
                        }
                    })
                }
            }


    
        console.log($scope.allFriends)
        }, 500)

            
    })