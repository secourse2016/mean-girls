angular.module('airline')
.controller("ResvShowController", function($http,$routeParams){
	var controller = this;
	$http.get('/resv/'+ $routeParams.id)
	.success(function(data){
		controller.resv = data;
	})
})