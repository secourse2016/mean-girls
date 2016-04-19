angular.module('alaska').factory('bookingSrvc', function ($http) {
  return {
  getBooking : function (cb) {
    var bookingRefNo=this.bookingRefNo;
    $http.get('/api/booking/'+bookingRefNo).success(function(booking){
      cb(booking);
    });
  }

  };
});
