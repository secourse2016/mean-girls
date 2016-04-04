app.controller('paymentCtrl',function($scope,$location){
  $scope.countries=["Alaska","Australia","Bahrain","Brazil","Cameroon","Canada","China","Cyprus","Denmark","Egypt","France","Georgia","Germany","Greece","Hong kong","Hungary","Iceland","India","Italy","Jamaica","Japan","Jordan","Kenya","Lebanon","Maldives","Morocco","Netherlands","New Zealand","Nigeria","Oman","Portugal","Qatar","Russia","Saudi Arabia","Sweden","Taiwan","United Arab Emirates","United Kingdom"];
  $scope.card=["Credit card", "Debit card", "Charge card", "ATM card", "Other"];
  $scope.SubmitPayment = function() {
    $location.url('/resv/hy123');
  };
});
