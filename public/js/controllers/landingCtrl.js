angular.module('alaska').controller('landingCtrl', function ($scope,landingSrvc,$location,$http){

	$http.get('dummyData/airports.json').success(function(data) {
		$scope.airports = data;
	});

	$scope.form={};
	$scope.form.class = "Economy";
	$scope.form.fromCountry="IAD";
	$scope.form.toCountry="IAD";

	$scope.findFlightsButtonClick = function() {
		landingSrvc.setFindFlightInfo($scope.form);

		$location.url('/flights');


	};
	$scope.showBooking = function() {

		$location.url('/resv/'+ $scope.bookingRef);


	};
	$scope.checkFlight = function() {

		$location.url('/flight-info');


	};

	$scope.notNull = function (airport){
		return airport.name != null;
	}


	//date picker items
	var dateSelect     = $('#flight-datepicker');
	var dateDepart     = $('#start-date');
	var dateReturn     = $('#end-date');
	var spanDepart     = $('.date-depart');
	var spanReturn     = $('.date-return');
	var spanDateFormat = 'ddd, MMMM D yyyy';

	dateSelect.datepicker({
	  autoclose: true,
	  format: "mm/dd",
	  maxViewMode: 0,
	  startDate: "now"
	}).on('change', function() {
	  var start = $.format.date(dateDepart.datepicker('getDate'), spanDateFormat);
	  var end = $.format.date(dateReturn.datepicker('getDate'), spanDateFormat);
	  spanDepart.text(start);
	  spanReturn.text(end);
	});


});
