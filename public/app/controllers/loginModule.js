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
	$scope.showError = false;
	
	var sanitizeData = function() {

	}

	$scope.loginUser = function() {
		console.log('user', $scope.user);

		$http.post('/user/login', $scope.user)
		.success(function(response) {
			console.log("response: ", response);
			$location.path("/recipeBox");
		})
		.error(function(response) {
			console.log("response: ", response);
			$scope.errorMsg = response;
			$scope.showError = true;
			// Set error status on page to response
		});;
	};

	$scope.addAccount = function() {
		console.log('newUser', $scope.newUser);

		$http.post('/user/register', $scope.newUser)
		.success(function(response) {
			console.log("response: ", response);
			$location.path("/home");
			// $location.path("/recipeBox");
		})
		.error(function(response) {
			$scope.showError = true;
			$scope.errorMsg = response;
		});
	};
}])


})();