(function(){
angular.module('addRecipeModule', [])

.config([function () {
	console.log("Add Recipe Module:: config");
}])

.run([function () {
	console.log("Add Recipe Module::running");
}])

.controller('AddRecipeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	$scope.newRecipe = "";
	$scope.ingredients;
	$scope.directions;
	$scope.subCat = "";

	// For the toggling of the side menu items
	$scope.recipeHelper = [];
	$scope.recipeHelper.recipeName = true;
	$scope.recipeHelper.recipeDescription = true;
	$scope.recipeHelper.recipeIngredients = true;
	$scope.recipeHelper.recipeDirections = true;


	var sanitizeData = function() {

	}

	$scope.submitData = function() {
		$scope.newRecipe.ingredients = $scope.ingredients.split(";");
		$scope.newRecipe.directions = $scope.directions.split(";");
		$scope.newRecipe.dateCreated = Date.now();
		$scope.newRecipe.subCat = [];

		// Iterate through subCat, adding any true value to newRecipe.subCat
		for (var key in $scope.subCat) {
		  	if($scope.subCat[key] == true) {
		  		$scope.newRecipe.subCat.push(key);
		  	}
		}

		$scope.newRecipe.imgName = "none";

		console.log("newRecipe: ", $scope.newRecipe);

		sanitizeData();

		$http.post('/addRecipe', $scope.newRecipe).success(function(response) {
			console.log("response: ", response);
			$location.path("/home");
		});
	};
}])


})();