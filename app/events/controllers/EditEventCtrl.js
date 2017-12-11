angular.module("LifeReelApp")
    .controller("EditEventCtrl", function($scope, $routeParams, EventFactory, $timeout){

        $scope.event = {}
        $scope.selectedRating = 0

        EventFactory.single($routeParams.eventId).then (event => {
            $timeout( () => {
                $scope.event= event
                $scope.selectedRating = event.rating

            }, 100)
        })



    })