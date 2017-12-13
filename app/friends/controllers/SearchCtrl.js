angular.module("LifeReelApp")
.controller("SearchCtrl", function($scope, FriendsFactory, UserFactory, $timeout){ 
    
    $scope.heading = "Find New Friends"
    $scope.userList = []


    $scope.findUser = function (search) {
        //if user doesn't enter anything in the search bar then nothing is returned
        if(search !== "" && search !== undefined) {
            const searchedName = search.toLowerCase() //converts string to lowercase
            const foundUsers = FriendsFactory.find(searchedName) //filters through cached users to find users that contain the searched name; doesn't include current user
            
            //set userList array as the search result
            $scope.userList = foundUsers
            
            //if no user found then alert user
            if(foundUsers.length === 0) {
                alert("User not found")
            } 
        }

    }

    $scope.addFriend = (user) => {
        const newFriend = {
            "senderUID": UserFactory.cache.uid, //sets current user as the sender
            "senderName": UserFactory.cache.fullName,
            "receiverUID": user.uid, //sets user being sent the request as receiver
            "receiverName": user.fullName,
            "date": Date.now(), //date the request was send
            "pending": true //default of pending request is true
        }
        FriendsFactory.add(newFriend)
    }
})