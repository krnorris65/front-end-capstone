angular.module("LifeReelApp")
.controller("FriendsCtrl", function($scope, FriendsFactory, $route, $timeout){ 

    $scope.userList = []

    FriendsFactory.allUsers().then(user => {
        // $scope.userList = user
    })

    $scope.heading = "Find Friends"

    $scope.findUser = function (search) {
        const searchedName = search.toLowerCase()
        const foundUser = FriendsFactory.find(searchedName)
        $scope.userList = foundUser
        
        if(foundUser.length === 0) {
            alert("User not found")
        }
        
    }
})