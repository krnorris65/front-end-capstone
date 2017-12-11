angular.module("LifeReelApp")
    .controller("EditEventCtrl", function($scope, $routeParams, EventFactory, $timeout){

        $scope.event = {}

        EventFactory.single($routeParams.eventId).then (event => {
            $timeout( () => {
                $scope.event= event

            }, 100)
        })



    })