
App.factory('landingSrv', function ($http) {
     return {

        setFindFlightInfo: function(value){
          this.flightInfo=value;
        },

         getFindFlightInfo: function() {
           return this.flightInfo;
         }
     };
 });