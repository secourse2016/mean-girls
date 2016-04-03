  var app = angular.module('airline',['ngRoute']);
 



app.config(function($routeProvider) {
    $routeProvider

        
        .when('/payment', {
            templateUrl : 'public/views/payment.html',
            controller  : 'paymentCtrl'
        });
});
