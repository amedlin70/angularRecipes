(function(){
angular.module('loginModule', [])

.config([function () {
	console.log("Login Module::config");
}])

.run([function () {
	console.log("Login Module::running");
}])

.controller('LoginCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	$scope.user = "";
	$scope.newUser = "";
	
	var sanitizeData = function() {

	}

	$scope.loginUser = function() {
		console.log('user', $scope.user);

		$http.post('/login', $scope.user).success(function(response) {
			console.log("response: ", response);
			$location.path("/home");
		});
	};

	$scope.addAccount = function() {
		console.log('newUser', $scope.newUser);

	};
}])


})();