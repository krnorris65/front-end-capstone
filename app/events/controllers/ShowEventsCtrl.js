angular.module("LifeReelApp")
    .controller("ShowEventsCtrl", function($scope, EventFactory, UserFactory, $timeout){
        
        const currentUser = UserFactory.cache
        $scope.heading = `${currentUser.first}'s Reel`
        let allEvents = []
        
        EventFactory.userEvents().then( events => {
            $timeout(()=> { 
                allEvents = events
                $scope.eventArray = allEvents
                
            }, 100)
            
        })
        
        
        $scope.highlights = () => {
            $scope.eventArray = allEvents.filter( event => {
                if(event.rating >= 3) {
                    return event
                }
            })
        }
        
        $scope.lowlights = () => {
            $scope.eventArray = allEvents.filter( event => {
                if(event.rating <= 2) {
                    return event
                }
            })
        }

        $scope.showAll = () => {
            $scope.eventArray = allEvents
        }
       

    })