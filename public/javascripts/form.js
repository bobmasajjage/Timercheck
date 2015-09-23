var app = angular.module('Zayed', []);

app.controller('formController', ['$http', '$window',
	function($http, $window){
	var self = this;
	
}]);

app.controller('MainCtrl', [function(){
	var self = this;
	self.date = function(){
		return new Date().getFullYear()
	}
}]);