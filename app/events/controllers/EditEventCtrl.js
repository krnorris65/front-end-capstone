angular.module("LifeReelApp")
    .controller("EditEventCtrl", function($scope, $routeParams, EventFactory, $timeout, $location){

        $scope.editEvent = {} 
        $scope.selectedRating = 0 
        

        EventFactory.single($routeParams.eventId).then (event => {
            $timeout( () => {
                $scope.editEvent= event //event information to edit
                $scope.selectedRating = event.rating //value of rating for radio button to show as selected

            }, 100)
        })

        //brings user back to their reel if they decide they don't want to make any changes to the event
        $scope.backToReel = () => {
            $location.url("/reel")
        }

        
        $scope.saveEvent = (event) => {
            //if no changes were made to the date, then don't reset the value of the date key. if changes were made, then parse the date and reset the value of the date key
            if($scope.date !== undefined) {
                event.date = Date.parse($scope.date)
            }
            
            event.rating = parseInt($scope.selectedRating) //parses the value string to a number

            //updates firebase with edits made and brings user back to their reel
            EventFactory.edit($routeParams.eventId, event).then( reload => {
                $timeout( ()=> {
                    $scope.backToReel()
                }, 100)
            })
        }


    })