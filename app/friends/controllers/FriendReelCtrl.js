angular.module("LifeReelApp")
    .controller("FriendReelCtrl", function($scope, EventFactory, FriendsFactory, $routeParams, $timeout, $location){

        
        FriendsFactory.currentFriend($routeParams.friendId).then(friend => {
            const firstName = friend.first
            
            $scope.heading = `${firstName}'s Reel`
        })

        EventFactory.friendEvents($routeParams.friendId).then(events => {
            $timeout(() => {
                $scope.eventArray = events.filter(event => {
                    return event.private === false
                })

            }, 100)
        })


    })