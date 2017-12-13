angular.module("LifeReelApp")
    .controller("ShowCtrl", function($scope, FriendsFactory, $timeout, $location){

        $scope.allFriends = []

        $scope.heading = "Added Friends"
        $timeout(()=>{
            //the initial if statement prevents an error from being given when the app is initially loaded
            if(FriendsFactory.sentCache !== null || FriendsFactory.receivedCache !== null) {

                //if the FriendsFactory.sentCache is greater than 0 then iterate through the array and for any friends who are not pending a confirmation then create a friend object and add it to the allFriends array
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
    
                //if the FriendsFactory.receivedCache is greater than 0 then iterate through the array and for any friends who are not pending a confirmation then create a friend object and add it to the allFriends array
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

        }, 500)

        $scope.removeFriend = (friend) => {
            FriendsFactory.delete(friend.friendKey)
    
        }

            
    })