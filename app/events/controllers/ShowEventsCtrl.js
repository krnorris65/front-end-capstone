angular.module("LifeReelApp")
    .controller("ShowEventsCtrl", function($scope, EventFactory, UserFactory, $timeout, $location){
        
        let allEvents = [] //array that holds all of the events to allow for filtering when buttons are pressed
        
        //loading page and all events for user
        $timeout( ()=> {
            const currentUser = UserFactory.cache
            $scope.heading = `${currentUser.first}'s Life Reel`
            $scope.subheading = "Customize Reel"

            EventFactory.userEvents().then( events => {
                $timeout(()=> { 
                    allEvents = events
                    $scope.eventArray = allEvents
                }, 100)
                
            })

        }, 500)
        
        //allows user to set the date range of the events shown.
        $scope.setDates = () => {
            const dateMin = Date.parse($scope.min)
            const dateMax = Date.parse($scope.max)

            if(dateMax < dateMin){
                alert("End Date needs to be after the Start Date")
            } else {
                allEvents = allEvents.filter( event => {
                    if(event.date >= dateMin && event.date <= dateMax) {
                        return event
                    }
                })
                
                $scope.eventArray = allEvents
            }

        }

        //clears dates that the user set and shows all of the user's events again
        $scope.clearDates = () => {
            $scope.min = ""
            $scope.max = ""

            allEvents = EventFactory.cache
            $scope.eventArray = allEvents
        }
        
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





    })