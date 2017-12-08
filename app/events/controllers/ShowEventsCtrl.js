angular.module("LifeReelApp")
    .controller("ShowEventsCtrl", function($scope, EventFactory, UserFactory, $timeout){
        
        const currentUser = UserFactory.cache
        $scope.heading = `${currentUser.first}'s Reel`
        $scope.eventArray = []

        EventFactory.userEvents().then( events => {
            $timeout(()=> { 
                $scope.eventArray = events
            
            }, 100)
            $scope.eventArray.forEach( event =>{
                const newDate = event.date
                const dateString = new Date(newDate).toDateString()
                console.log(dateString)
                debugger
            })
        })


    })