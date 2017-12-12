angular.module("LifeReelApp")
.controller("FriendsCtrl", function($scope, FriendsFactory){ 

    let userList = []

    FriendsFactory.allUsers().then(user => {
        userList = user
    })

    $scope.heading = "Find Friends"
})