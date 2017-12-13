angular.module("LifeReelApp")
    .controller("FriendReelCtrl", function($scope, EventFactory, $routeParams, $timeout){

        $scope.heading = "Friend's Reel"

        EventFactory.friendEvents($routeParams.friendId).then(events => {
            $timeout(() => {
                $scope.eventArray = events.filter(event => {
                    return event.private === false
                })

            }, 100)
        })


    })