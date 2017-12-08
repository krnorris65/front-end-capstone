angular.module("LifeReelApp")
    .controller("AddEventCtrl", function($scope, AuthFactory){

        $scope.heading = "Add new segment"

        $scope.newEvent = {
            "title": "",
            "date": "",
            "rating": 0,
            "description": "",
            "private": false,
        }
        
        $scope.addEvent = (event) => {
            event.date= Date.parse($scope.date) //parses the date into numeric value
            event.rating = parseInt($scope.rating) //parses the value string to a number
            event.userUID = AuthFactory.getUser().uid //user uid links event to the user
            
            console.log(event)
        }

})