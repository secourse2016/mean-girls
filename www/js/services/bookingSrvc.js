angular.module('alaskaIonic').factory('bookingSrvc', function ($http) {
  return {
  getBooking : function (cb) {

    var booking = this.booking;
    cb(booking);
  }

  };
});
