angular.module("LifeReelApp")
    .controller("ShowEventsCtrl", function($scope, EventFactory, UserFactory, $timeout, $location, $route){
        
        const currentUser = UserFactory.cache
        $scope.heading = `${currentUser.first}'s Reel`

        let allEvents = [] //array that holds all of the events to allow for filtering when buttons are pressed
        
        EventFactory.userEvents().then( events => {
            $timeout(()=> { 
                allEvents = events
                $scope.eventArray = allEvents //$scope.eventArray is what the html iterates over
                
            }, 100)
            
        })

        
        //only shows segments with a rating of 3 or more
        $scope.highlights = () => {
            $scope.eventArray = allEvents.filter( event => {
                if(event.rating >= 3) {
                    return event
                }
            })
        }
        
        //only shows segments with a rating of 2 or less
        $scope.lowlights = () => {
            $scope.eventArray = allEvents.filter( event => {
                if(event.rating <= 2) {
                    return event
                }
            })
        }
        
        //shows all the segments if the user previously filtered them
        $scope.showAll = () => {
            $scope.eventArray = allEvents
        }

        $scope.deleteEvent = (e) => {
            const buttonId = e.target.id
            const eventKey = buttonId.split("!")[1]

            EventFactory.delete(eventKey).then(reload => {
                $timeout(()=> { 
                    $route.reload()
                }, 100)
            })

        }


    })