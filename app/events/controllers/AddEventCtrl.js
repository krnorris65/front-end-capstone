angular.module("LifeReelApp")
    .controller("AddEventCtrl", function($scope, AuthFactory, EventFactory, $location, $timeout){

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

        const showSnackbar = (message) => {
            let snack = document.getElementById("snackbar")
                // Add the "show" class to DIV
                snack.className = "show"
                $scope.snackText= message

            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ 
                snack.className = snack.className.replace("show", "") 
            }, 3000)

        }

        
        $scope.addEvent = (event) => {
            if($scope.date === undefined || $scope.rating === undefined || event.title === "") {
                showSnackbar("Please add a title, date and rating")
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
    
                // shows snackbar that says a new segment has been added to the reel
                showSnackbar("A new segment has been add to your reel")
                
                $timeout(() => {
                    $scope.backHome()
                }, 1000)
                
            }


        }
        

})