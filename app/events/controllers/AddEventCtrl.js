angular.module("LifeReelApp")
    .controller("AddEventCtrl", function($scope, AuthFactory, EventFactory, $location){

        $scope.heading = "Add new segment" //adds title to page

        //brings user back to landing page
        $scope.backHome = () => {
            $location.url("/landing")
        }

        //default settings of a new event
        $scope.newEvent = {
            "title": "",
            "date": "",
            "rating": 0,
            "description": "",
            "private": false,
        }
        
        $scope.addEvent = (event) => {
            if($scope.date === undefined || $scope.rating === undefined || event.title === "") {
                alert("Please add a title, date and rating")
            } else {
                event.date= Date.parse($scope.date) //parses the date into numeric value
                event.rating = parseInt($scope.rating) //parses the value string to a number    
                event.userUID = AuthFactory.getUser().uid //user uid links event to the user
                
                EventFactory.add(event) //adds event to firebase
                
                //resets newEvent object
                $scope.newEvent = { 
                    "title": "",
                    "date": "",
                    "rating": 0,
                    "description": "",
                    "private": false,
                }
                
                //resets date and rating fields in the form
                $scope.date = "" 
                $scope.rating = ""
    
                alert("A new segment has been add to your reel")
                
                
                $scope.backHome()
            }


        }
        

})