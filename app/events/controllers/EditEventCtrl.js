angular.module("LifeReelApp")
    .controller("EditEventCtrl", function($scope, $routeParams, EventFactory, $timeout, $location){

        $scope.editEvent = {}
        $scope.selectedRating = 0
        

        EventFactory.single($routeParams.eventId).then (event => {
            $timeout( () => {
                $scope.editEvent= event
                $scope.selectedRating = event.rating

            }, 100)
        })

        $scope.saveEvent = (event) => {

            if($scope.date !== undefined) {
                event.date = Date.parse($scope.date)
            }
            
            event.rating = parseInt($scope.selectedRating)
            console.log(event)
        }

        $scope.cancelEdit = () => {
            $location.url("/reel")
        }

    })