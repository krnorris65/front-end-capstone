angular.module("LifeReelApp")
.controller("SearchCtrl", function($scope, FriendsFactory, UserFactory, $timeout, $location, $route){ 
    
    $scope.heading = "Find New Friends"
    $scope.userList = []

    let friendsArray = []
    //checks to see if what friend relationships already exist (both pending and not)
    if(FriendsFactory.sentCache !== null || FriendsFactory.receivedCache !== null) {
        if(FriendsFactory.sentCache.length > 0){
            FriendsFactory.sentCache.forEach(friend => {
                const status = {
                    "friendUID": friend.receiverUID,
                    "pending": friend.pending,
                    "dateSent": friend.date
                }
                
                friendsArray.push(status)
            })
        }

        if(FriendsFactory.receivedCache.length > 0){
            FriendsFactory.receivedCache.forEach(friend => {
                const status = {
                    "friendUID": friend.senderUID,
                    "pending": friend.pending,
                    "dateSent": friend.date
                }
                
                friendsArray.push(status)
            })
        }
    }

    $scope.findUser = function (search) {
        //if user doesn't enter anything in the search bar then nothing is returned
        if(search !== "" && search !== undefined) {
            const searchedName = search.toLowerCase() //converts string to lowercase
            const foundUsers = FriendsFactory.find(searchedName) //filters through cached users to find users that contain the searched name; doesn't include current user

            foundUsers.forEach(result => {
                friendsArray.forEach( friend => {
                    //if the user in the results matches a friend in the friendsArray, set the pendingStatus as the current status of the friendship
                    if(result.uid === friend.friendUID) {
                        result.pendingStatus = friend.pending
                        result.dateSent = friend.dateSent
                    }
                })
            })

            //set userList array as the search result
            $scope.userList = foundUsers
            $scope.searchString = ""
            
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
        $scope.userList = []
        $scope.searchString = ""
        // $timeout(()=> {
        //     FriendsFactory.sentRequests()
        //     $timeout()
        //     // $location.url("/friends/pending")
        // }, 500)
    }
})