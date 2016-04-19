angular.module('alaska').factory('bookingSrvc', function ($http) {
  return {
  getBooking : function (cb) {
    $http.get('/api/booking'+bookingSrvc.bookingReference).success(function(booking){
      cb(booking);
    });
  }

  };
});
