angular.module('alaskaIonic').factory('flightsSrvc', function ($http) {

  return {
 	
 	getAirports: function(){
	   return [{
	        "iata": "BOM",
	        "lon": "72.87497",
	        "iso": "IN",
	        "status": 1,
	        "name": "Chhatrapati Shivaji International Airport",
	        "continent": "AS",
	        "type": "airport",
	        "lat": "19.095509",
	        "size": "large"
	    },
	    {
	        "iata": "CAI",
	        "lon": "31.40647",
	        "iso": "EG",
	        "status": 1,
	        "name": "Cairo International Airport",
	        "continent": "AF",
	        "type": "airport",
	        "lat": "30.120106",
	        "size": "large"
	    },
	    {
	        "iata": "HKG",
	        "lon": "113.93649",
	        "iso": "HK",
	        "status": 1,
	        "name": "Chek Lap Kok International Airport",
	        "continent": "AS",
	        "type": "airport",
	        "lat": "22.315248",
	        "size": "large"
	    },
	    {
	        "iata": "JNB",
	        "lon": "28.231314",
	        "iso": "ZA",
	        "status": 1,
	        "name": "OR Tambo International Airport",
	        "continent": "AF",
	        "type": "airport",
	        "lat": "-26.132664",
	        "size": "large"
	    },
	    {
	        "iata": "RUH",
	        "lon": "46.702877",
	        "iso": "SA",
	        "status": 1,
	        "name": "King Khaled International Airport",
	        "continent": "AS",
	        "type": "airport",
	        "lat": "24.95929",
	        "size": "large"
	    },
	    {
	        "iata": "LHR",
	        "lon": "-0.453566",
	        "iso": "GB",
	        "status": 1,
	        "name": "London Heathrow Airport",
	        "continent": "EU",
	        "type": "airport",
	        "lat": "51.469604",
	        "size": "large"
	    },
	    {
	        "iata": "LCF",
	        "lon": "-88.94778",
	        "iso": "GT",
	        "status": 1,
	        "name": "Las Vegas Airport",
	        "continent": "NA",
	        "type": "airport",
	        "lat": "15.667778",
	        "size": "small"
	    },
	    {
	        "iata": "LAX",
	        "lon": "-118.40828",
	        "iso": "US",
	        "status": 1,
	        "name": "Los Angeles International Airport",
	        "continent": "NA",
	        "type": "airport",
	        "lat": "33.943398",
	        "size": "large"
	    },
	    {
	        "iata": "FRA",
	        "lon": "8.570773",
	        "iso": "DE",
	        "status": 1,
	        "name": "Frankfurt am Main International Airport",
	        "continent": "EU",
	        "type": "airport",
	        "lat": "50.050735",
	        "size": "large"
	    },
	    {
	        "iata": "FCO",
	        "lon": "12.250346",
	        "iso": "IT",
	        "status": 1,
	        "name": "Leonardo Da Vinci (Fiumicino) International Airport",
	        "continent": "EU",
	        "type": "airport",
	        "lat": "41.794594",
	        "size": "large"
	    },
	    {
	        "iata": "DEL",
	        "lon": "77.10079",
	        "iso": "IN",
	        "status": 1,
	        "name": "Indira Gandhi International Airport",
	        "continent": "AS",
	        "type": "airport",
	        "lat": "28.556555",
	        "size": "large"
	    },
	    {
	        "iata": "JED",
	        "lon": "39.150578",
	        "iso": "SA",
	        "status": 1,
	        "name": "King Abdulaziz International Airport",
	        "continent": "AS",
	        "type": "airport",
	        "lat": "21.670233",
	        "size": "large"
	    },
	    {
	        "iata": "TPE",
	        "lon": "121.22389",
	        "iso": "TW",
	        "status": 1,
	        "name": "Taiwan Taoyuan International Airport",
	        "continent": "AS",
	        "type": "airport",
	        "lat": "25.07639",
	        "size": "large"
	    },
	    {
	        "iata": "CPT",
	        "lon": "18.596489",
	        "iso": "ZA",
	        "status": 1,
	        "name": "Cape Town International Airport",
	        "continent": "AF",
	        "type": "airport",
	        "lat": "-33.968906",
	        "size": "large"
	    },
	    {
	        "iata": "JFK",
	        "lon": "-73.78817",
	        "iso": "US",
	        "status": 1,
	        "name": "John F Kennedy International Airport",
	        "continent": "NA",
	        "type": "airport",
	        "lat": "40.642334",
	        "size": "large"
	    },
	    {
	        "iata": "LAX",
	        "lon": "-118.40828",
	        "iso": "US",
	        "status": 1,
	        "name": "Los Angeles International Airport",
	        "continent": "NA",
	        "type": "airport",
	        "lat": "33.943398",
	        "size": "large"
	    },
	    {
	        "iata": "SFO",
	        "lon": "-122.38988",
	        "iso": "US",
	        "status": 1,
	        "name": "San Francisco International Airport",
	        "continent": "NA",
	        "type": "airport",
	        "lat": "37.615215",
	        "size": "large"
	    },
	    {
	        "iata": "TXL",
	        "lon": "13.291722",
	        "iso": "DE",
	        "status": 1,
	        "name": "Berlin-Tegel International Airport",
	        "continent": "EU",
	        "type": "airport",
	        "lat": "52.553944",
	        "size": "large"
	    },
	    {
	        "iata": "LIN",
	        "lon": "9.279157",
	        "iso": "IT",
	        "status": 1,
	        "name": "Linate Airport",
	        "continent": "EU",
	        "type": "airport",
	        "lat": "45.460957",
	        "size": "large"
	    }];
    },

    setFindFlightInfo: function(value){
      this.flightInfo=value;
    },

    getFindFlightInfo: function() {
      return this.flightInfo;
    }
    
   };
});