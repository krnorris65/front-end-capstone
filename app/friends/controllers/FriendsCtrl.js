angular.module("LifeReelApp")
.controller("FriendsCtrl", function($scope, FriendsFactory, UserFactory, $timeout){ 

    $scope.userList = []

    FriendsFactory.allUsers().then(user => {
        // $scope.userList = user
    })

    $scope.heading = "Find Friends"

    $scope.findUser = function (search) {
        const searchedName = search.toLowerCase() //converts string to lowercase
        const foundUsers = FriendsFactory.find(searchedName) //filters through cached users to find users that contain the searched name; doesn't include current user
        

        $scope.userList = foundUsers
        
        if(foundUsers.length === 0) {
            alert("User not found")
        } 
    }

    $scope.addFriend = (user) => {
        console.log(user)
    }
})