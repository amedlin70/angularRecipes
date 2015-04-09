(function(){
angular.module('recipeBoxModule', [])

.config([function () {
	console.log("Recipe Box Module::config");
}])

.run([function () {
	console.log("Recipe Box Module::running");
}])

.controller('RecipeBoxCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	// Get recipes
    $http.get('/user/recipeBox')
    .success(function(response) {
    	console.log("Received get response: ", response);
    	$scope.recipes = response;
  	})
  	.error(function(response) {
  		$location.path("/login");
  	});

  	$scope.logout = function() {
		$http.get('/user/logout')
		.success(function(response) {
			console.log("response: ", response);
			$location.path("/home");
		});
	};
}])


})();