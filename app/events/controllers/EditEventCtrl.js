angular.module("LifeReelApp")
    .controller("EditEventCtrl", function($scope, $routeParams, EventFactory){

        EventFactory.single($routeParams.eventId).then (event => {
            console.log(event)
        })


    })