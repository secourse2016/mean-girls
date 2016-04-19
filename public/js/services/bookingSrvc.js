angular.module('alaska').factory('bookingSrvc', function ($http) {
  return {
  getBooking : function (cb) {
    $http.get('/api/booking/'+this.bookingRefNo).success(function(booking){
      cb(booking);
    });
  }

  };
});
