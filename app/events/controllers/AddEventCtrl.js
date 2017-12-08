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
            event.date= Date.parse($scope.date)
            event.rating = parseInt($scope.rating)
            event.userUID = AuthFactory.getUser().uid 
            
            debugger
            console.log(event)
        }

})