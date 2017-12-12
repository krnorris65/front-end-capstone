angular.module("LifeReelApp")
    .controller("PendingCtrl", function($scope, FriendsFactory, UserFactory, $timeout) {

        $scope.heading = "Sent Requests"
        $scope.requests = [{fullName: "Test This"}]

        let friendArray = []


        FriendsFactory.sentRequests().then(friend => {
            friendArray = friend

        }).then( results => {

            UserFactory.listCache.filter( user => {
                friendArray.filter( f => {
                    if(f.receiverUID === user.uid) {
                        $scope.apply()
                        $scope.requests = user
                    }
                })

                
            })
            
            console.log($scope.requests)
        })



    })