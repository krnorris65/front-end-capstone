angular.model("LifeReelApp")
    .controller("AddEventCtrl", function($scope){

        $scope.newEvent = {}

        $scope.addEvent = (event) => {
            console.log(event)
        }

})