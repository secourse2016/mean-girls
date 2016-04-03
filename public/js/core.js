  var app = angular.module('alaska',['ngRoute']);
 



app.config(function($routeProvider) {
    $routeProvider

        
        .when('/payment', {
            templateUrl : 'public/views/payment.html',
            controller  : 'paymentCtrl'
        });
});
